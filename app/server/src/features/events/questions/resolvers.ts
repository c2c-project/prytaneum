/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventQuestion } from '@app/prisma';
import { fromGlobalId, connectionFromArray } from 'graphql-relay';
import { Resolvers, withFilter, errors, toGlobalId } from '@local/features/utils';
import { Like } from '@local/graphql-types';
import * as Question from './methods';

const toQuestionId = toGlobalId('EventQuestion');
const toUserId = toGlobalId('User');

export const resolvers: Resolvers = {
    Query: {
        async questionsByEventId(parent, args, ctx, info) {
            const questions = await Question.findQuestionsByEventId(args.eventId, ctx.prisma);
            return questions.map(toQuestionId);
        },
    },
    Mutation: {
        async createQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const question = await Question.createQuestion(ctx.viewer.id, ctx.prisma, args.input);
            const formattedQuestion = toQuestionId(question);
            ctx.pubsub.publish({
                topic: 'eventQuestionCreated',
                payload: {
                    eventQuestionCreated: formattedQuestion,
                },
            });
            return formattedQuestion;
        },
        async alterLike(parent, args, ctx, info) {
            // this whole function is kinda eh
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const { likedQuestion: questionId, likedBy: userId } = await Question.alterLikeByQuestionId(
                ctx.viewer.id,
                ctx.prisma,
                args.input
            );
            const formattedResult = { user: { id: userId }, question: { id: questionId } };
            ctx.pubsub.publish({
                topic: 'likeCountChanged',
                payload: {
                    likeCountChanged: formattedResult,
                },
            });
            return formattedResult;
        },
    },
    Subscription: {
        likeCountChanged: {
            subscribe: withFilter<{ likeCountChanged: Like }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('likeCountChanged'),
                (payload, args, ctx) =>
                    Question.doesEventMatch(args.id, payload.likeCountChanged.question.id, ctx.prisma)
            ),
        },
        eventQuestionCreated: {
            subscribe: withFilter<{ eventQuestionCreated: EventQuestion }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventQuestionCreated'),
                (payload, args, ctx) => Question.doesEventMatch(args.id, payload.eventQuestionCreated.id, ctx.prisma)
            ),
        },
    },
    EventQuestion: {
        async createdBy(parent, args, ctx, info) {
            const { id: questionId } = fromGlobalId(parent.id);
            const submitter = await Question.findSubmitterByQuestionId(questionId, ctx.prisma);
            return toUserId(submitter);
        },
        async refQuestion(parent, args, ctx, info) {
            const { id: questionId } = fromGlobalId(parent.id);
            const question = await Question.findRefQuestion(questionId, ctx.prisma);
            return toQuestionId(question);
        },
        async likedBy(parent, args, ctx, info) {
            const { id: questionId } = fromGlobalId(parent.id);
            const likedByUsers = await Question.findLikedByUsers(questionId, ctx.prisma);
            return connectionFromArray(likedByUsers.map(toUserId), args);
        },
        likedByCount(parent, args, ctx, info) {
            const { id: questionId } = fromGlobalId(parent.id);
            return Question.countLikes(questionId, ctx.prisma);
        },
        isLikedByMe(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null;
            const { id: questionId } = fromGlobalId(parent.id);
            return Question.isLikedByMe(ctx.viewer.id, questionId, ctx.prisma);
        },
        isMyQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null;
            const { id: questionId } = fromGlobalId(parent.id);
            return Question.isMyQuestion(ctx.viewer.id, questionId, ctx.prisma);
        },
    },
};
