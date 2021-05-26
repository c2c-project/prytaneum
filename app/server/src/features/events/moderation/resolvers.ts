import { Resolvers, withFilter, errors, toGlobalId } from '@local/features/utils';
import { EventLiveFeedback } from '@local/graphql-types';
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
        async reorderQueue(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const updatedQuestion = await Moderation.reorderQuestion(ctx.viewer.id, ctx.prisma, args.input);
            return toQuestionId(updatedQuestion);
        },
        async addModerator(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const newMod = await Moderation.addModerator(ctx.viewer.id, ctx.prisma, args.input);
            return toUserId(newMod);
        },
        nextQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, args.eventId, 1);
        },
        prevQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Moderation.changeCurrentQuestion(ctx.viewer.id, ctx.prisma, args.eventId, -1);
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
