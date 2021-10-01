/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { fromGlobalId } from 'graphql-relay';
import type { EventLiveFeedback, QuestionOperation, EventQuestion } from '@local/graphql-types';
import * as Moderation from './methods';
import { doesEventMatch } from '../questions/methods';

const toQuestionId = toGlobalId('EventQuestion');
const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

export const resolvers: Resolvers = {
    Mutation: {
        async hideQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const hiddenQuestion = await Moderation.hideQuestionById(ctx.viewer.id, ctx.prisma, args.input);
            return toQuestionId(hiddenQuestion);
        },
        async updateQuestionPosition(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
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
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: { operationType: 'UPDATE', edge } as QuestionOperation,
                    },
                });
                return edge;
            });
        },
        async nextQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const { id: eventId } = fromGlobalId(args.eventId);
            const updatedEvent = await Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, eventId, 1);
            const eventWithGlobalId = toEventId(updatedEvent);

            ctx.pubsub.publish({
                topic: 'eventUpdates',
                payload: {
                    eventUpdates: eventWithGlobalId,
                },
            });
            return eventWithGlobalId;
        },
        async prevQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const { id: eventId } = fromGlobalId(args.eventId);
            const updatedEvent = await Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, eventId, -1);
            const eventWithGlobalId = toEventId(updatedEvent);
            ctx.pubsub.publish({
                topic: 'eventUpdates',
                payload: {
                    eventUpdates: eventWithGlobalId,
                },
            });
            return eventWithGlobalId;
        },
        async createModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const newMod = await Moderation.createModerator(ctx.viewer.id, ctx.prisma, { ...args.input, eventId });
                return toUserId(newMod);
            });
        },
        async updateModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: userId } = fromGlobalId(args.input.userId);
                const newMod = await Moderation.updateModerator(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    userId,
                });
                return toUserId(newMod);
            });
        },
        async deleteModerator(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
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
        updateQuestionQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                // TODO Check if the question is a current question as it must be handled differently
                const { adding } = args.input;
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                let updatedQuestion;
                if (adding) {
                    updatedQuestion = await Moderation.addQuestionToQueue(ctx.viewer.id, ctx.prisma, {
                        ...args.input,
                        eventId,
                        questionId,
                    });
                } else {
                    updatedQuestion = await Moderation.removeQuestionFromQueue(ctx.viewer.id, ctx.prisma, {
                        ...args.input,
                        eventId,
                        questionId,
                    });
                }
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    cursor: updatedQuestion.createdAt.getTime().toString(),
                    node: questionWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: { operationType: 'UPDATE', edge } as QuestionOperation,
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionQueued',
                    payload: {
                        questionQueued: edge,
                    },
                });
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
        questionQueued: {
            subscribe: withFilter<{ questionQueued: EventQuestionEdge }>(
                (parent, args, ctx, info) => ctx.pubsub.subscribe('questionQueued'),
                async (payload, args, ctx) => {
                    const { id: questionId } = fromGlobalId(payload.questionQueued.node.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    return doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
    },
};
