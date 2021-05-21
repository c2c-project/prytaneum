import { EventQuestion } from '@app/prisma';
import { Resolvers, withFilter } from '@local/features/utils';
import { Like } from '@local/graphql-types';
import * as Question from './methods';

export const resolvers: Resolvers = {
    Query: {
        questionsByid(parent, args, ctx, info) {
            return Question.questionsByid(args.id, ctx.prisma);
        },
    },
    Mutation: {
        async createQuestion(parent, args, ctx, info) {
            const question = await Question.createQuestion(ctx.userId, ctx.prisma, args.input);
            ctx.pubsub.publish({
                topic: 'eventQuestionCreated',
                payload: {
                    eventQuestionCreated: question,
                },
            });
            return question;
        },
        async alterLike(parent, args, ctx, info) {
            const result = await Question.alterLikeById(ctx.userId, ctx.prisma, args.input);
            ctx.pubsub.publish({
                topic: 'likeCountChanged',
                payload: {
                    likeCountChanged: result,
                },
            });
            return result;
        },
    },
    Subscription: {
        likeCountChanged: {
            subscribe: withFilter<{ likeCountChanged: Like }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('likeCountChanged'),
                (payload, args, ctx) =>
                    Question.doesEventMatch(args.id, payload.likeCountChanged.question.questionId, ctx.prisma)
            ),
        },
        eventQuestionCreated: {
            subscribe: withFilter<{ eventQuestionCreated: EventQuestion }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventQuestionCreated'),
                (payload, args, ctx) =>
                    Question.doesEventMatch(args.id, payload.eventQuestionCreated.questionId, ctx.prisma)
            ),
        },
    },
    EventQuestion: {
        async createdBy(parent, args, ctx, info) {
            return Question.findSubmitter(parent.createdById, ctx.prisma);
        },
        refQuestion(parent, args, ctx, info) {
            return Question.findRefQuestion(parent.refQuestionId, ctx.prisma);
        },
        likedBy(parent, args, ctx, info) {
            return Question.findLikedByUsers(parent.questionId, ctx.prisma);
        },
        likedByCount(parent, args, ctx, info) {
            return Question.countLikes(parent.questionId, ctx.prisma);
        },
        isLikedByMe(parent, args, ctx, info) {
            return Question.isLikedByMe(ctx.userId, parent.questionId, ctx.prisma);
        },
    },
};
