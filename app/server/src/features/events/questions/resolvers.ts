/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId, connectionFromArray } from 'graphql-relay';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import type { QuestionOperation } from '@local/graphql-types';
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
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const question = await Question.createQuestion(ctx.viewer.id, ctx.prisma, { ...args.input, eventId });
                const formattedQuestion = toQuestionId(question);
                if (formattedQuestion.refQuestion)
                    formattedQuestion.refQuestion = toQuestionId(formattedQuestion.refQuestion);
                const edge = {
                    node: formattedQuestion,
                    cursor: formattedQuestion.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: { operationType: 'CREATE', edge } as QuestionOperation,
                    },
                });

                // TODO: better cursors
                return edge;
            });
        },
        async alterLike(parent, args, ctx, info) {
            return runMutation(async () => {
                // this whole function is kinda eh
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const question = await Question.alterLikeByQuestionId(ctx.viewer.id, ctx.prisma, {
                    ...args.input,
                    questionId,
                });
                if (!question) return question;
                const edge = {
                    node: toQuestionId(question),
                    cursor: question.createdAt.getTime().toString(),
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
    },
    Subscription: {
        questionCRUD: {
            subscribe: withFilter<{ questionCRUD: QuestionOperation }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionCRUD'),
                (payload, args, ctx) => {
                    const { id: questionId } = fromGlobalId(payload.questionCRUD.edge.node.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
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
        isLikedByViewer(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null;
            const { id: questionId } = fromGlobalId(parent.id);
            return Question.isLikedByViewer(ctx.viewer.id, questionId, ctx.prisma);
        },
        isMyQuestion(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null;
            const { id: questionId } = fromGlobalId(parent.id);
            return Question.isMyQuestion(ctx.viewer.id, questionId, ctx.prisma);
        },
    },
};
