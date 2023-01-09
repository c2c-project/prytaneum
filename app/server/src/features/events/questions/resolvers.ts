/* eslint-disable @typescript-eslint/no-unused-vars */
import { fromGlobalId, connectionFromArray } from 'graphql-relay';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import type { EventQuestionEdgeContainer } from '@local/graphql-types';
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
                    topic: 'questionCreated',
                    payload: {
                        questionCreated: { edge },
                    },
                });

                return edge;
            });
        },
        async deleteQuestion(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: questionId } = fromGlobalId(args.input.questionId);
                const enqueued = await Question.isEnqueued(questionId, ctx.prisma);
                if (enqueued) throw new Error('Cannot delete an enqueued question');
                const deletedQuestion = await Question.updateQuestionVisibility(
                    questionId,
                    args.input.isVisible,
                    ctx.prisma
                );
                const formattedQuestion = toQuestionId(deletedQuestion);
                const edge = {
                    node: formattedQuestion,
                    cursor: formattedQuestion.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'questionDeleted',
                    payload: {
                        questionDeleted: { edge },
                        eventId: formattedQuestion.eventId,
                    },
                });

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
                    topic: 'questionUpdated',
                    payload: {
                        questionUpdated: { edge },
                    },
                });
                return edge;
            });
        },
    },
    Subscription: {
        questionCreated: {
            subscribe: withFilter<{ questionCreated: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionCreated'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionCreated.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionUpdated: {
            subscribe: withFilter<{ questionUpdated: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionUpdated'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionUpdated.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionDeleted: {
            subscribe: withFilter<{ questionDeleted: EventQuestionEdgeContainer; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionDeleted'),
                (payload, args, ctx) => {
                    const { eventId: questionEventId } = payload;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionDeleted.edge.node.id);
                    return eventId === questionEventId;
                }
            ),
        },
        questionAddedToRecord: {
            subscribe: withFilter<{ questionAddedToRecord: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionAddedToRecord'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionAddedToRecord.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionRemovedFromRecord: {
            subscribe: withFilter<{ questionRemovedFromRecord: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionRemovedFromRecord'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionRemovedFromRecord.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionAddedToEnqueued: {
            subscribe: withFilter<{ questionAddedToEnqueued: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionAddedToEnqueued'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionAddedToEnqueued.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        questionRemovedFromEnqueued: {
            subscribe: withFilter<{ questionRemovedFromEnqueued: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('questionRemovedFromEnqueued'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.questionRemovedFromEnqueued.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        enqueuedPushQuestion: {
            subscribe: withFilter<{ enqueuedPushQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('enqueuedPushQuestion'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.enqueuedPushQuestion.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        enqueuedUnshiftQuestion: {
            subscribe: withFilter<{ enqueuedUnshiftQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('enqueuedUnshiftQuestion'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.enqueuedUnshiftQuestion.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        enqueuedRemoveQuestion: {
            subscribe: withFilter<{ enqueuedRemoveQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('enqueuedRemoveQuestion'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.enqueuedRemoveQuestion.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        recordPushQuestion: {
            subscribe: withFilter<{ recordPushQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('recordPushQuestion'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.recordPushQuestion.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        recordUnshiftQuestion: {
            subscribe: withFilter<{ recordUnshiftQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('recordUnshiftQuestion'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.recordUnshiftQuestion.edge.node.id);
                    return Question.doesEventMatch(eventId, questionId, ctx.prisma);
                }
            ),
        },
        recordRemoveQuestion: {
            subscribe: withFilter<{ recordRemoveQuestion: EventQuestionEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('recordRemoveQuestion'),
                async (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { id: questionId } = fromGlobalId(payload.recordRemoveQuestion.edge.node.id);
                    const temp = await Question.doesEventMatch(eventId, questionId, ctx.prisma);
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
