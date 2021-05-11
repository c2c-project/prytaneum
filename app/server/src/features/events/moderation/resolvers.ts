import { Resolvers, withFilter } from '@local/features/utils';
import { EventLiveFeedback } from '@local/graphql-types';
import * as Moderation from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        hideQuestion(parent, args, ctx, info) {
            return Moderation.hideQuestionById(ctx.userId, ctx.prisma, args.input);
        },
        reorderQueue(parent, args, ctx, info) {
            return Moderation.reorderQuestion(ctx.userId, ctx.prisma, args.input);
        },
        addModerator(parent, args, ctx, info) {
            return Moderation.addModerator(ctx.userId, ctx.prisma, args.input);
        },
        nextQuestion(parent, args, ctx, info) {
            return Moderation.changeCurrentQuestion(ctx.userId, ctx.prisma, args.eventId, 1);
        },
        prevQuestion(parent, args, ctx, info) {
            return Moderation.changeCurrentQuestion(ctx.userId, ctx.prisma, args.eventId, -1);
        },
    },
    Subscription: {
        eventLiveFeedbackCreated: {
            subscribe: withFilter<{ eventLiveFeedbackCreated: EventLiveFeedback }>(
                (parent, args, ctx, info) => ctx.pubsub.subscribe('eventLiveFeedbackCreated'),
                (payload, args, ctx) =>
                    Moderation.isEventRelevant(args.eventId, ctx.prisma, payload.eventLiveFeedbackCreated.feedbackId)
            ),
        },
    },
};
