/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId } from 'graphql-relay';
import * as Moderation from './methods';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { EventLiveFeedback } from '@local/graphql-types';

const toQuestionId = toGlobalId('EventQuestion');
const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

const LOCK_EXPIRE_TIME = 5; // seconds

export const resolvers: Resolvers = {
    Mutation: {
        async hideQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            const hiddenQuestion = await Moderation.hideQuestionById(ctx.viewer.id, ctx.prisma, args.input);
            return toQuestionId(hiddenQuestion);
        },
        async updateQuestionPosition(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                try {
                    const result = await ctx.redis.get(`question-lock:${questionId}`);
                    if (result !== null)
                        throw new ProtectedError({
                            userMessage:
                                'Question currently being modified by another moderator, please try again shortly',
                        });
                } catch (error) {
                    if (error instanceof ProtectedError) throw error;
                    ctx.app.log.error('Error checking for question lock', error);
                }

                // Set the semaphore lock
                try {
                    ctx.app.log.info(`Setting lock for question: ${questionId}`);
                    await ctx.redis.set(`question-lock:${questionId}`, 'true', 'EX', LOCK_EXPIRE_TIME);
                } catch (error) {
                    ctx.app.log.error(`Error setting lock for question: ${questionId}`, error);
                }

                const updatedQuestion = await Moderation.updateQuestionPosition(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    node: questionWithGlobalId,
                    cursor: questionWithGlobalId.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: { edge },
                    },
                });

                // Release the semaphore lock
                try {
                    ctx.app.log.info(`Releasing lock for question: ${questionId}`);
                    await ctx.redis.del(`question-lock:${questionId}`);
                } catch (error) {
                    ctx.app.log.error(`Error releasing lock for question: ${questionId}`, error);
                }
                return edge;
            });
        },
        // TODO: make this a normal mutation response
        async nextQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            const { id: eventId } = fromGlobalId(args.eventId);

            // Check cache to see if event queue is currently being modified
            try {
                const result = await ctx.redis.get(`event-queue-lock:${eventId}`);
                if (result !== null)
                    throw new ProtectedError({
                        userMessage:
                            'Event queue currently being updated by another moderator, please try again shortly',
                    });
            } catch (error) {
                if (error instanceof ProtectedError) throw error;
                ctx.app.log.error('Error checking for event queue lock', error);
            }

            // Set the semaphore lock
            try {
                ctx.app.log.info(`Setting lock for event: ${eventId}`);
                await ctx.redis.set(`event-queue-lock:${eventId}`, 'true', 'EX', LOCK_EXPIRE_TIME);
            } catch (error) {
                ctx.app.log.error(`Error setting lock for event: ${eventId}`, error);
            }

            const { event, newCurrentQuestion } = await Moderation.incrementQuestion(
                ctx.viewer.id,
                ctx.prisma,
                eventId
            );
            const eventWithGlobalId = toEventId(event);
            const newCurrentQuestionWithGlobalId = toQuestionId(newCurrentQuestion);

            if (!newCurrentQuestionWithGlobalId) return eventWithGlobalId;

            ctx.pubsub.publish({
                topic: 'enqueuedRemoveQuestion',
                payload: {
                    enqueuedRemoveQuestion: {
                        edge: {
                            node: newCurrentQuestionWithGlobalId,
                            cursor: newCurrentQuestionWithGlobalId.createdAt.getTime().toString(),
                        },
                    },
                },
            });

            ctx.pubsub.publish({
                topic: 'recordPushQuestion',
                payload: {
                    recordPushQuestion: {
                        edge: {
                            node: newCurrentQuestionWithGlobalId,
                            cursor: newCurrentQuestionWithGlobalId.createdAt.getTime().toString(),
                        },
                    },
                },
            });
            // Release the semaphore lock
            try {
                ctx.app.log.info(`Releasing lock for event: ${eventId}`);
                await ctx.redis.del(`event-queue-lock:${eventId}`);
            } catch (error) {
                ctx.app.log.error(`Error releasing lock for event: ${eventId}`, error);
            }
            return eventWithGlobalId;
        },
        // TODO: make this a normal mutation response
        async prevQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            const { id: eventId } = fromGlobalId(args.eventId);

            // Check cache to see if event queue is currently being modified
            try {
                const result = await ctx.redis.get(`event-queue-lock:${eventId}`);
                if (result !== null)
                    throw new ProtectedError({
                        userMessage:
                            'Event queue currently being updated by another moderator, please try again shortly',
                    });
            } catch (error) {
                if (error instanceof ProtectedError) throw error;
                ctx.app.log.error('Error checking for event queue lock', error);
            }

            // Set the semaphore lock
            try {
                ctx.app.log.info(`Setting lock for event: ${eventId}`);
                await ctx.redis.set(`event-queue-lock:${eventId}`, 'true', 'EX', LOCK_EXPIRE_TIME);
            } catch (error) {
                ctx.app.log.error(`Error setting lock for event: ${eventId}`, error);
            }

            const { event, prevCurrentQuestion } = await Moderation.decrementQuestion(
                ctx.viewer.id,
                ctx.prisma,
                eventId
            );

            const eventWithGlobalId = toEventId(event);
            const prevCurrentQuestionWithGlobalId = toQuestionId(prevCurrentQuestion);
            ctx.pubsub.publish({
                topic: 'enqueuedUnshiftQuestion',
                payload: {
                    enqueuedUnshiftQuestion: {
                        edge: {
                            node: prevCurrentQuestionWithGlobalId,
                            cursor: prevCurrentQuestion.createdAt.getTime().toString(),
                        },
                    },
                },
            });
            ctx.pubsub.publish({
                topic: 'recordRemoveQuestion',
                payload: {
                    recordRemoveQuestion: {
                        edge: {
                            node: prevCurrentQuestionWithGlobalId,
                            cursor: prevCurrentQuestion.createdAt.getTime().toString(),
                        },
                    },
                },
            });

            // Release the semaphore lock
            try {
                ctx.app.log.info(`Releasing lock for event: ${eventId}`);
                await ctx.redis.del(`event-queue-lock:${eventId}`);
            } catch (error) {
                ctx.app.log.error(`Error releasing lock for event: ${eventId}`, error);
            }
            return eventWithGlobalId;
        },
        async createModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const newMod = await Moderation.createModerator(ctx.viewer.id, ctx.prisma, { ...args.input, eventId });
                return toUserId(newMod);
            });
        },
        async updateModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                // const { id: userId } = fromGlobalId(args.input.userId);
                const queryResult = await Moderation.findUserIdByEmail(args.input.email, ctx.prisma);
                if (!queryResult) return null;
                const userId = queryResult.id;
                const newMod = await Moderation.updateModerator(userId, eventId, ctx.prisma);
                return toUserId(newMod);
            });
        },
        async deleteModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: userId } = fromGlobalId(args.input.userId);
                const deletedMod = await Moderation.deleteModerator(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    userId,
                });
                return toUserId(deletedMod);
            });
        },
        addQuestionToQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                try {
                    const result = await ctx.redis.get(`question-lock:${questionId}`);
                    if (result !== null) {
                        throw new ProtectedError({
                            userMessage:
                                'Question currently being modified by another moderator, please try again shortly',
                        });
                    }
                } catch (error) {
                    if (error instanceof ProtectedError) throw error;
                    ctx.app.log.error('Error checking for question lock', error);
                }

                // Set the semaphore lock
                try {
                    ctx.app.log.info(`Setting lock for question: ${questionId}`);
                    await ctx.redis.set(`question-lock:${questionId}`, 'true', 'EX', LOCK_EXPIRE_TIME);
                } catch (error) {
                    ctx.app.log.error(`Error setting lock for question: ${questionId}`, error);
                }

                const updatedQuestion = await Moderation.addQuestionToQueue(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    cursor: updatedQuestion.createdAt.getTime().toString(),
                    node: questionWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'enqueuedPushQuestion',
                    payload: {
                        enqueuedPushQuestion: { edge },
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: { edge },
                    },
                });

                // Release the semaphore lock
                try {
                    ctx.app.log.info(`Releasing lock for question: ${questionId}`);
                    await ctx.redis.del(`question-lock:${questionId}`);
                } catch (error) {
                    ctx.app.log.error(`Error releasing lock for question: ${questionId}`, error);
                }
                return edge;
            });
        },
        removeQuestionFromQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                try {
                    const result = await ctx.redis.get(`question-lock:${questionId}`);
                    if (result !== null) {
                        throw new ProtectedError({
                            userMessage:
                                'Question currently being modified by another moderator, please try again shortly',
                        });
                    }
                } catch (error) {
                    if (error instanceof ProtectedError) throw error;
                    ctx.app.log.error('Error checking for question lock', error);
                }

                // Set the semaphore lock
                try {
                    ctx.app.log.info(`Setting lock for question: ${questionId}`);
                    await ctx.redis.set(`question-lock:${questionId}`, 'true', 'EX', LOCK_EXPIRE_TIME);
                } catch (error) {
                    ctx.app.log.error(`Error setting lock for question: ${questionId}`, error);
                }

                const updatedQuestion = await Moderation.removeQuestionFromQueue(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    cursor: updatedQuestion.createdAt.getTime().toString(),
                    node: questionWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'enqueuedRemoveQuestion',
                    payload: {
                        enqueuedRemoveQuestion: { edge },
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: { edge },
                    },
                });

                // Release the semaphore lock
                try {
                    ctx.app.log.info(`Releasing lock for question: ${questionId}`);
                    await ctx.redis.del(`question-lock:${questionId}`);
                } catch (error) {
                    ctx.app.log.error(`Error releasing lock for question: ${questionId}`, error);
                }
                return edge;
            });
        },
    },
    Subscription: {
        eventLiveFeedbackCreated: {
            subscribe: withFilter<{ eventLiveFeedbackCreated: EventLiveFeedback }>(
                (parent, args, ctx, info) => ctx.pubsub.subscribe('eventLiveFeedbackCreated'),
                (payload, args, ctx) =>
                    Moderation.isEventRelevant(args.id, ctx.prisma, payload.eventLiveFeedbackCreated.id)
            ),
        },
    },
};
