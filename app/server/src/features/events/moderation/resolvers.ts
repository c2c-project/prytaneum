/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId } from 'graphql-relay';
import * as Moderation from './methods';
import {
    Resolvers,
    withFilter,
    errors,
    toGlobalId,
    runMutation,
    tryAquireRedisLock,
    releaseRedisLock,
    checkForRedisLock,
} from '@local/features/utils';
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
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
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
                            eventId,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async updateTopicQueuePosition(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const { topic } = args.input;

                const updatedQuestion = await Moderation.updateTopicQueuePosition(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                // Can use the topic position as the cursor since it is unique
                const topicPosition = Moderation.getTopicPosition(updatedQuestion, topic);
                const edge = {
                    node: questionWithGlobalId,
                    cursor: topicPosition.toString() ?? questionWithGlobalId.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: { edge },
                        eventId,
                    },
                });
                return edge;
            });
        },
        // TODO: make this a normal mutation response
        async nextQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            const { id: eventId } = fromGlobalId(args.eventId);

            const { event, newCurrentQuestion } = await Moderation.incrementOnDeck(ctx.viewer.id, eventId, ctx.prisma);
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
                    eventId,
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
                    eventId,
                },
            });
            return eventWithGlobalId;
        },
        // TODO: make this a normal mutation response
        async prevQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            const { id: eventId } = fromGlobalId(args.eventId);

            const { event, prevCurrentQuestion } = await Moderation.decrementOnDeck(ctx.viewer.id, eventId, ctx.prisma);

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
                    eventId,
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
                    eventId,
                },
            });
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
        async addQuestionToTopicQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const updatedQuestion = await Moderation.addQuestionToTopicQueue(ctx.viewer.id, ctx.prisma, {
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
                    topic: 'topicQueuePush',
                    payload: {
                        topicQueuePush: { edge },
                        eventId,
                        topic: args.input.topic,
                        viewerId: ctx.viewer.id,
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionEnqueued',
                    payload: {
                        questionEnqueued: { edge },
                        eventId,
                        topic: args.input.topic,
                        viewerId: ctx.viewer.id,
                    },
                });
                return edge;
            });
        },
        async removeQuestionFromTopicQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const updatedQuestion = await Moderation.removeQuestionFromTopicQueue(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    cursor: updatedQuestion.createdAt.getTime().toString(),
                    node: questionWithGlobalId,
                };
                // Remove the question from the topic queue
                ctx.pubsub.publish({
                    topic: 'topicQueueRemove',
                    payload: {
                        topicQueueRemove: { edge },
                        eventId,
                        topic: args.input.topic,
                        viewerId: ctx.viewer.id,
                    },
                });
                // Add the question back to the question list
                ctx.pubsub.publish({
                    topic: 'questionDequeued',
                    payload: {
                        questionDequeued: { edge },
                        eventId,
                        topic: args.input.topic,
                        viewerId: ctx.viewer.id,
                    },
                });
                return edge;
            });
        },
        async addQuestionToQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                // Set the semaphore lock
                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
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
                            eventId,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'questionUpdated',
                        payload: {
                            questionUpdated: { edge },
                            eventId,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'topicQueuePush',
                        payload: {
                            topicQueuePush: { edge },
                            eventId,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async addQuestionToOnDeck(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                // Set the semaphore lock
                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
                    const updatedQuestion = await Moderation.addQuestionToOnDeck(ctx.viewer.id, ctx.prisma, {
                        ...args.input,
                        eventId,
                        questionId,
                    });
                    const questionWithGlobalId = toQuestionId(updatedQuestion);
                    const edge = {
                        cursor: updatedQuestion.onDeckPosition ?? updatedQuestion.createdAt.getTime().toString(),
                        node: questionWithGlobalId,
                    };
                    ctx.pubsub.publish({
                        topic: 'enqueuedPushQuestion',
                        payload: {
                            enqueuedPushQuestion: { edge },
                            eventId,
                            viewerId: ctx.viewer.id,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'topicQueueRemove',
                        payload: {
                            topicQueueRemove: { edge },
                            eventId: updatedQuestion.eventId,
                            viewerId: ctx.viewer.id,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async removeQuestionFromOnDeck(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                // const { topic, overQuestionId, isAboveQuestion } = args.input;

                // Check cache to see if question is currently being modified
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                // Set the semaphore lock
                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
                    const updatedQuestion = await Moderation.removeQuestionFromOnDeck(ctx.viewer.id, ctx.prisma, {
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
                            eventId,
                            viewerId: ctx.viewer.id,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'topicQueuePush',
                        payload: {
                            topicQueuePush: { edge },
                            eventId: updatedQuestion.eventId,
                            viewerId: ctx.viewer.id,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async removeQuestionFromQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                // Set the semaphore lock
                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
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
                        topic: 'topicQueueRemove',
                        payload: {
                            topicQueueRemove: { edge },
                            eventId,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'enqueuedRemoveQuestion',
                        payload: {
                            enqueuedRemoveQuestion: { edge },
                            eventId,
                        },
                    });
                    ctx.pubsub.publish({
                        topic: 'questionUpdated',
                        payload: {
                            questionUpdated: { edge },
                            eventId,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async updateOnDeckPosition(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);

                // Check cache to see if question is currently being modified
                const lockExists = await checkForRedisLock(ctx.redis, `question-lock:${questionId}`);
                if (lockExists) {
                    throw new ProtectedError({
                        userMessage: 'Question currently being modified by another moderator, please try again shortly',
                    });
                }

                // Set the semaphore lock
                try {
                    const lockAquired = await tryAquireRedisLock(ctx.redis, `question-lock:${questionId}`, {
                        lockTimeout: 5, // 5 seconds
                        acquireTimeout: 2000, // 2 seconds
                        acquireAttemptsLimit: 2,
                        retryInterval: 1000, // 1 seconds
                    });
                    if (!lockAquired)
                        throw new ProtectedError({
                            userMessage: errors.unexpected,
                            internalMessage: `Error acquiring redis lock for question: ${questionId}`,
                        });
                    const updatedQuestion = await Moderation.updateOnDeckPosition(ctx.viewer.id, ctx.prisma, {
                        ...args.input,
                        eventId,
                        questionId,
                    });
                    const questionWithGlobalId = toQuestionId(updatedQuestion);
                    const edge = {
                        cursor: updatedQuestion.onDeckPosition ?? updatedQuestion.createdAt.getTime().toString(),
                        node: questionWithGlobalId,
                    };
                    ctx.pubsub.publish({
                        topic: 'questionUpdated',
                        payload: {
                            questionUpdated: { edge },
                            eventId,
                        },
                    });
                    return edge;
                } catch (error) {
                    throw error;
                } finally {
                    releaseRedisLock(ctx.redis, `question-lock:${questionId}`);
                }
            });
        },
        async updateEventType(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { eventType } = args.input;

                const result = await Moderation.updateEventType(eventId, eventType, ctx.prisma);

                return result.eventType;
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
