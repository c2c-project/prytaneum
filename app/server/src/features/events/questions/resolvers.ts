/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId, connectionFromArray } from 'graphql-relay';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import type { EventQuestionEdge, QuestionOperation } from '@local/graphql-types';
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
                // TODO: #QQRedesign delete once code complete
                ctx.pubsub.publish({
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: { operationType: 'CREATE', edge } as QuestionOperation,
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionCreated',
                    payload: {
                        questionCreated: edge,
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
                // TODO: #QQRedesign delete once code complete
                ctx.pubsub.publish({
                    topic: 'questionCRUD',
                    payload: {
                        questionCRUD: { operationType: 'UPDATE', edge } as QuestionOperation,
                    },
                });
                ctx.pubsub.publish({
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: edge,
                    },
                });
                return edge;
            });
        },
    },
    Subscription: {
        // TODO: #QQRedesign delete after code complete
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
        questionCreated: {
            subscribe: withFilter<{ questionCreated: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionCreated'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionCreated.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionUpdated: {
            subscribe: withFilter<{ questionUpdated: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionUpdated'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionUpdated.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionDeleted: {
            subscribe: withFilter<{ questionDeleted: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionDeleted'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionDeleted.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionAddedToRecord: {
            subscribe: withFilter<{ questionAddedToRecord: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionAddedToRecord'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionAddedToRecord.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionRemovedFromRecord: {
            subscribe: withFilter<{ questionRemovedFromRecord: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionRemovedFromRecord'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionRemovedFromRecord.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionAddedToEnqueued: {
            subscribe: withFilter<{ questionAddedToEnqueued: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionAddedToEnqueued'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionAddedToEnqueued.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionRemovedFromEnqueued: {
            subscribe: withFilter<{ questionRemovedFromEnqueued: EventQuestionEdge }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionRemovedFromEnqueued'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionRemovedFromEnqueued.node.id);
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
