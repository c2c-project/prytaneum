import { EventQuestion } from '@app/prisma';
import { Resolvers, withFilter } from '@local/features/utils';
import * as Question from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        createQuestion(parent, args, ctx, info) {
            return Question.createQuestion(ctx.userId, ctx.prisma, args.input);
        },
        async alterLike(parent, args, ctx, info) {
            return Question.alterLikeById(ctx.userId, ctx.prisma, args.input);
        },
    },
    Subscription: {
        // https://github.com/mercurius-js/mercurius/issues/471
        // likeCountChanged: {
        //     subscribe: withFilter(
        //         (parent, args, ctx) => ctx.pubsub.subscribe('likeCountChanged'),
        //         (payload: EventQuestion, args, ctx) => Question.doesEventMatch(args.eventId, payload)
        //     ),
        // },
        // eventQuestionCreated: {
        //     subscribe: withFilter(
        //         (parent, args, ctx) => ctx.pubsub.subscribe('eventQuestionCreated'),
        //         (payload: EventQuestion, args, ctx) => Question.doesEventMatch(args.eventId, payload)
        //     ),
        // },
    },
};
