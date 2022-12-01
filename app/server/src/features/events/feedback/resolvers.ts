import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Feedback from './methods';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { FeedbackOperation } from '@local/graphql-types';
import { EventLiveFeedbackPrompt } from '../../../graphql-types';

const toFeedbackId = toGlobalId('EventLiveFeedback');
const toFeedbackPromptId = toGlobalId('EventLiveFeedbackPrompt');
const toFeedbackPromptResponseId = toGlobalId('EventLiveFeedbackPromptResponse');
const toUserId = toGlobalId('User');

export const resolvers: Resolvers = {
    Query: {
        async myFeedback(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.eventId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: eventId } = fromGlobalId(args.eventId);
            const feedback = Feedback.myFeedback(ctx.viewer.id, eventId, ctx.prisma);
            return feedback;
        },
        async promptResponses(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: promptId } = fromGlobalId(args.promptId);
            const responses = await Feedback.promptResponses(promptId, ctx.prisma);
            return responses;
        },
    },
    Mutation: {
        async createFeedback(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const feedback = await Feedback.createFeedback(ctx.viewer.id, eventId, ctx.prisma, args.input);
                const formattedFeedback = toFeedbackId(feedback);
                if (formattedFeedback.refFeedback)
                    formattedFeedback.refFeedback = toFeedbackId(formattedFeedback.refFeedback);
                const edge = {
                    node: formattedFeedback,
                    cursor: feedback.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'feedbackCRUD',
                    payload: {
                        feedbackCRUD: { operationType: 'CREATE', edge },
                    },
                });
                return edge;
            });
        },
        async createFeedbackPrompt(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const prompt = await Feedback.createFeedbackPrompt(ctx.viewer.id, eventId, ctx.prisma, args.input);
                const formattedPrompt = toFeedbackPromptId(prompt);
                const edge = {
                    node: formattedPrompt,
                    cursor: formattedPrompt.id,
                };
                ctx.pubsub.publish({
                    topic: 'feedbackPrompted',
                    payload: { feedbackPrompted: formattedPrompt },
                });
                return edge;
            });
        },
        async createFeedbackPromptResponse(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: promptId } = fromGlobalId(args.input.promptId);
                const promptResponse = await Feedback.createFeedbackPromptResponse(
                    ctx.viewer.id,
                    promptId,
                    ctx.prisma,
                    args.input
                );
                const formattedPromptResponse = toFeedbackPromptResponseId(promptResponse);
                const edge = {
                    node: formattedPromptResponse,
                    cursor: formattedPromptResponse.id,
                };
                return edge;
            });
        },
    },
    Subscription: {
        feedbackCRUD: {
            subscribe: withFilter<{ feedbackCRUD: FeedbackOperation }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackCRUD'),
                (payload, args, ctx) => {
                    const { id: feedbackId } = fromGlobalId(payload.feedbackCRUD.edge.node.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update moderators & feedback creator as other participants cant see other's feedback
                    return Feedback.doesEventMatchFeedback(eventId, feedbackId, ctx.prisma);
                }
            ),
        },
        feedbackPrompted: {
            subscribe: withFilter<{ feedbackPrompted: EventLiveFeedbackPrompt }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackPrompted'),
                (payload, args, ctx) => {
                    const { id: feedbackPromptId } = fromGlobalId(payload.feedbackPrompted.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update to non moderator participants
                    return Feedback.doesEventMatchFeedbackPrompt(eventId, feedbackPromptId, ctx.prisma);
                }
            ),
        },
    },
    EventLiveFeedback: {
        async createdBy(parent, args, ctx) {
            const { id: feedbackId } = fromGlobalId(parent.id);
            const submitter = await Feedback.findSubmitterByFeedbackId(feedbackId, ctx.prisma);
            return toUserId(submitter);
        },
        async refFeedback(parent, args, ctx) {
            const { id: feedbackId } = fromGlobalId(parent.id);
            const feedback = await Feedback.findRefFeedback(feedbackId, ctx.prisma);
            return toFeedbackId(feedback);
        },
    },
    EventLiveFeedbackPrompt: {
        async responses(parent, args, ctx) {
            // TODO: prisma pagination for responses
            const { id: promptId } = fromGlobalId(parent.id);
            const responses = await Feedback.findResponsesByPromptId(promptId, ctx.prisma);
            return connectionFromArray(responses.map(toFeedbackPromptResponseId), args);
        },
    },
};
