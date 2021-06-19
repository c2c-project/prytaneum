/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { EventLiveFeedback } from '@local/graphql-types';
import { fromGlobalId } from 'graphql-relay';
import * as Moderation from './methods';

const toQuestionId = toGlobalId('EventQuestion');
const toUserId = toGlobalId('User');

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
                ctx.pubsub.publish({
                    topic: 'questionPositionUpdate',
                    payload: {
                        questionPositionUpdate: questionWithGlobalId,
                    },
                });
                return {
                    node: questionWithGlobalId,
                    cursor: questionWithGlobalId.createdAt.getMilliseconds().toString(),
                };
            });
        },
        nextQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const { id: eventId } = fromGlobalId(args.eventId);
            return Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, eventId, 1);
        },
        prevQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const { id: eventId } = fromGlobalId(args.eventId);
            return Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, eventId, -1);
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
        addQuestionToQueue(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const updatedQuestion = await Moderation.addQuestionToQueue(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    eventId,
                    questionId,
                });
                const questionWithGlobalId = toQuestionId(updatedQuestion);
                const edge = {
                    cursor: updatedQuestion.createdAt.getMilliseconds().toString(),
                    node: questionWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: edge,
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
    },
};
