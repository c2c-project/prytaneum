// import { EventQuestionL } from '@app/prisma';
import { Resolvers, withFilter } from '@local/features/utils';
import * as Question from './methods';

export const resolvers: Resolvers = {
    Query: {
        questionsByEventId(parent, args, ctx, info) {
            return Question.questionsByEventId(args.eventId, ctx.prisma);
        },
    },
    Mutation: {
        createQuestion(parent, args, ctx, info) {
            return Question.createQuestion(ctx.userId, ctx.prisma, args.input);
        },
        async alterLike(parent, args, ctx, info) {
            return Question.alterLikeById(ctx.userId, ctx.prisma, args.input);
        },
    },
    Subscription: {
        likeCountChanged: {
            subscribe: withFilter(
                (parent, args, ctx) => ctx.pubsub.subscribe('likeCountChanged'),
                (payload, args, ctx) => Question.doesEventMatch(args.eventId, payload)
            ),
        },
        eventQuestionCreated: {
            subscribe: withFilter(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventQuestionCreated'),
                (payload, args, ctx) => Question.doesEventMatch(args.eventId, payload)
            ),
        },
    },
};
