/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Feedback from './methods';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { FeedbackOperation } from '@local/graphql-types';
import { EventLiveFeedbackPrompt } from '../../../graphql-types';
import { isModerator } from '../moderation/methods';

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
            const feedback = await Feedback.myFeedback(ctx.viewer.id, eventId, ctx.prisma);
            return feedback.map(toFeedbackId);
        },
        async promptResponses(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: promptId } = fromGlobalId(args.promptId);
            const responses = await Feedback.promptResponses(promptId, ctx.prisma);
            return responses.map(toFeedbackPromptResponseId);
        },
        async prompt(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: promptId } = fromGlobalId(args.promptId);
            const prompt = await Feedback.findPromptByPromptId(promptId, ctx.prisma);
            return toFeedbackPromptId(prompt);
        },
        async prompts(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.eventId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: eventId } = fromGlobalId(args.eventId);
            const prompts = await Feedback.findPromptsByEventId(eventId, ctx.prisma);
            return prompts.map(toFeedbackPromptId);
        },
        async promptResponseVotes(parent, args, ctx) {
            if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
            if (!args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
            const { id: promptId } = fromGlobalId(args.promptId);
            const votes = await Feedback.countPromptResponseVotes(promptId, ctx.prisma);
            return votes;
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
                        recipientId: formattedFeedback.refFeedback ? formattedFeedback.refFeedback.createdById : null,
                        eventId,
                        creatorId: ctx.viewer.id,
                    },
                });
                return edge;
            });
        },
        async createFeedbackDM(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: recipientId } = fromGlobalId(args.input.recipientId);
                const feedback = await Feedback.createFeedbackDM(
                    ctx.viewer.id,
                    eventId,
                    recipientId,
                    ctx.prisma,
                    args.input
                );
                const formattedFeedback = toFeedbackId(feedback);
                const edge = {
                    node: formattedFeedback,
                    cursor: feedback.createdAt.getTime().toString(),
                };
                ctx.pubsub.publish({
                    topic: 'feedbackCRUD',
                    payload: {
                        feedbackCRUD: { operationType: 'CREATE', edge },
                        recipientId,
                        eventId,
                        creatorId: ctx.viewer.id,
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
                const { isDraft } = args.input;
                const prompt = await Feedback.createFeedbackPrompt(ctx.viewer.id, eventId, ctx.prisma, args.input);
                const formattedPrompt = toFeedbackPromptId(prompt);
                const edge = {
                    node: formattedPrompt,
                    cursor: formattedPrompt.id,
                };
                if (!isDraft)
                    ctx.pubsub.publish({
                        topic: 'feedbackPrompted',
                        payload: { feedbackPrompted: formattedPrompt },
                    });
                return edge;
            });
        },
        async shareFeedbackPromptDraft(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: promptId } = fromGlobalId(args.promptId);
                const prompt = await Feedback.findPromptByPromptId(promptId, ctx.prisma);
                await Feedback.shareFeedbackPromptDraft(promptId, ctx.prisma);
                if (!prompt)
                    throw new ProtectedError({
                        userMessage: 'Inalid Prompt',
                        internalMessage: 'Expected Prompt but got null',
                    });
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
        async shareFeedbackPromptResults(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.eventId || !args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: promptId } = fromGlobalId(args.promptId);
                const { id: eventId } = fromGlobalId(args.eventId);
                // TODO: Pass in option to use ai summary
                await Feedback.summarizePromptResponses(promptId, eventId, ctx.redis, ctx.prisma);
                const prompt = await Feedback.findPromptByPromptId(promptId, ctx.prisma);
                if (!prompt)
                    throw new ProtectedError({
                        userMessage: 'Inalid Prompt',
                        internalMessage: 'Expected Prompt but got null',
                    });
                const formattedPrompt = toFeedbackPromptId(prompt);
                const edge = {
                    node: formattedPrompt,
                    cursor: formattedPrompt.id,
                };
                ctx.pubsub.publish({
                    topic: 'feedbackPromptResultsShared',
                    payload: { feedbackPromptResultsShared: formattedPrompt },
                });
                return edge;
            });
        },
        async submitPostEventFeedback(parent, args, ctx) {
            return runMutation(async () => {
                const { feedback } = args;
                const { id: eventId } = fromGlobalId(args.eventId);
                await Feedback.submitPostEventFeedback(feedback, eventId, ctx.viewer.id, ctx.prisma);
            });
        },
        async generateViewpoints(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.eventId);
                const { id: promptId } = fromGlobalId(args.promptId);
                const prompt = await Feedback.summarizePromptResponses(promptId, eventId, ctx.redis, ctx.prisma);
                if (!prompt)
                    throw new ProtectedError({
                        userMessage: 'Inalid Prompt',
                        internalMessage: 'Expected Prompt but got null',
                    });
                const formattedPrompt = toFeedbackPromptId(prompt);
                const edge = {
                    node: formattedPrompt,
                    cursor: formattedPrompt.id,
                };
                return edge;
            });
        },
    },
    Subscription: {
        feedbackCRUD: {
            subscribe: withFilter<{
                feedbackCRUD: FeedbackOperation;
                recipientId: string;
                eventId: string;
                creatorId: string;
            }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackCRUD'),
                async (payload, args, ctx) => {
                    // Check that user is logged in
                    if (!ctx.viewer.id) return false;
                    // Check if user is the creator of the feedback
                    if (ctx.viewer.id === payload.creatorId) return false;
                    // Check if user is the recipient of the DM or feedback reply
                    if (ctx.viewer.id === payload.recipientId) return true;
                    // Check if it is an update for the right event
                    const { id: eventId } = fromGlobalId(args.eventId);
                    if (eventId !== payload.eventId) return false;
                    // Check if user is a moderator
                    const hasPermission = await isModerator(ctx.viewer.id, eventId, ctx.prisma);
                    return hasPermission;
                }
            ),
        },
        feedbackPrompted: {
            subscribe: withFilter<{ feedbackPrompted: EventLiveFeedbackPrompt }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackPrompted'),
                (payload, args, ctx) => {
                    // Check that user is logged in
                    if (!ctx.viewer.id) return false;
                    const { id: feedbackPromptId } = fromGlobalId(payload.feedbackPrompted.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update to non moderator participants
                    return Feedback.doesEventMatchFeedbackPrompt(eventId, feedbackPromptId, ctx.prisma);
                }
            ),
        },
        feedbackPromptResultsShared: {
            subscribe: withFilter<{ feedbackPromptResultsShared: EventLiveFeedbackPrompt }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackPromptResultsShared'),
                (payload, args, ctx) => {
                    // Check that user is logged in
                    if (!ctx.viewer.id) return false;
                    const { id: feedbackPromptId } = fromGlobalId(payload.feedbackPromptResultsShared.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update to non moderator participants
                    return Feedback.doesEventMatchFeedbackPrompt(eventId, feedbackPromptId, ctx.prisma);
                }
            ),
        },
    },
    EventLiveFeedback: {
        async dmRecipientId(parent, args, ctx) {
            if (!parent.isDM) return null;
            const recipientGlobalId = parent.dmRecipientId;
            if (!recipientGlobalId) return null;
            const { id: recipientId } = toUserId({ id: recipientGlobalId });
            return recipientId;
        },
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
            const responsesWithPromptResponseId = responses.map(toFeedbackPromptResponseId);
            const connection = connectionFromArray(responsesWithPromptResponseId, args);
            if (responses.length === 0)
                connection.pageInfo = { ...connection.pageInfo, startCursor: '', endCursor: '' };
            return connection;
        },
        async viewpoints(parent, args, ctx) {
            const { id: promptId } = fromGlobalId(parent.id);
            const viewpoints = await Feedback.findViewpointsByPromptId(promptId, ctx.prisma);
            return viewpoints;
        },
    },
    EventLiveFeedbackPromptResponse: {
        async createdBy(parent, args, ctx) {
            const { id: responseId } = fromGlobalId(parent.id);
            const submitter = await Feedback.findSubmitterByResponseId(responseId, ctx.prisma);
            return toUserId(submitter);
        },
    },
};
