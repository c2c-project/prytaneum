/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Feedback from './methods';
import * as FeedbackFlowMethods from './feedbackFlow.methods';
import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { EventLiveFeedbackPromptEdge, FeedbackFlowEdge, FeedbackOperation } from '@local/graphql-types';
import { EventLiveFeedbackPrompt } from '../../../graphql-types';
import { isModerator } from '../moderation/methods';

const toFeedbackId = toGlobalId('EventLiveFeedback');
const toFeedbackPromptId = toGlobalId('EventLiveFeedbackPrompt');
const toFeedbackPromptResponseId = toGlobalId('EventLiveFeedbackPromptResponse');
const toUserId = toGlobalId('User');
const toFeedbackFlowId = toGlobalId('FeedbackFlow');
const toFeedbackFlowPromptId = toGlobalId('FeedbackFlowPrompt');

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
            ctx.app.log.debug(`Fetching prompt responses for promptId: ${args.promptId}`);
            const { id: promptId } = fromGlobalId(args.promptId);
            ctx.app.log.debug(`Converted promptId: ${promptId}`);
            // const isFlow = args.isFlow || false;
            // if (isFlow) {
            //     const flowResponses = await FeedbackFlowMethods.promptFlowResponses(promptId, ctx.prisma);
            //     return flowResponses.map(toFeedbackPromptResponseId);
            // }
            const responses = await Feedback.promptResponses(promptId, ctx.prisma);
            ctx.app.log.debug(`Found ${responses.length} responses for prompt ${promptId}`);
            ctx.app.log.debug(`Responses: ${JSON.stringify(responses)}`);
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
                ctx.pubsub.publish({
                    topic: 'feedbackPrompted',
                    payload: { feedbackPrompted: edge, isDraft, prompterId: ctx.viewer.id },
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
                    payload: { feedbackPrompted: edge, isDraft: false, prompterId: ctx.viewer.id },
                });
                return edge;
            });
        },
        async reshareFeedbackPrompt(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: promptId } = fromGlobalId(args.promptId);
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
                    topic: 'feedbackPrompted',
                    payload: { feedbackPrompted: edge, isDraft: false, prompterId: ctx.viewer.id },
                });
                return edge;
            });
        },
        async createFeedbackPromptResponse(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: promptId } = fromGlobalId(args.input.promptId);

                // Check if already responded
                const hasResponded = await ctx.redis.get(`feedbackPromptResponse:${promptId}:${ctx.viewer.id}`);
                if (hasResponded)
                    throw new ProtectedError({
                        userMessage: 'You have already submitted a response for this prompt.',
                        internalMessage: `User ${ctx.viewer.id} tried to respond to prompt ${promptId}, but has already responded to it.`,
                    });

                const promptResponse = await Feedback.createFeedbackPromptResponse(
                    ctx.viewer.id,
                    promptId,
                    ctx.prisma,
                    args.input
                );

                // Cache that user has responded to this prompt
                const REDIS_EXPIRATION = 60 * 60 * 24; // 1 day in seconds
                ctx.redis.set(
                    `feedbackPromptResponse:${promptId}:${ctx.viewer.id}`,
                    JSON.stringify(promptResponse),
                    'EX',
                    REDIS_EXPIRATION
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
                const prompt = await Feedback.summarizePromptResponses({ prisma: ctx.prisma, promptId, eventId });
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
                if (!args.input.promptId) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const { id: promptId } = fromGlobalId(args.input.promptId);
                const isForcedRegenerate = args.input.isForcedRegenerate || false;
                ctx.app.log.info(
                    `Generating viewpoints for prompt ${promptId} in event ${eventId}. Is forced: ${isForcedRegenerate}`
                );
                const prompt = await Feedback.summarizePromptResponses({
                    prisma: ctx.prisma,
                    promptId,
                    eventId,
                    forceRegenerate: isForcedRegenerate,
                });
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
        createFeedbackFlow(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const flow = await FeedbackFlowMethods.createFeedbackFlow(ctx.viewer.id, ctx.prisma, args.input);
                const formattedFlow = toFeedbackFlowId(flow);
                ctx.app.log.debug(`Created feedback flow ${JSON.stringify(flow)}`);
                const edge = {
                    node: formattedFlow,
                    cursor: formattedFlow.id,
                };
                ctx.pubsub.publish({
                    topic: 'feedbackFlowPrompted',
                    payload: {
                        feedbackFlowPrompted: edge,
                        isDraft: args.input.isDraft,
                        prompterId: ctx.viewer.id,
                        eventId,
                    },
                });
                return edge;
            });
        },
        shareFeedbackFlowDraft(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.flowId) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: flowId } = fromGlobalId(args.flowId);
                const flow = await FeedbackFlowMethods.findFeedbackFlowByFlowId(flowId, ctx.prisma);
                const formattedFlow = toFeedbackFlowId(flow);
                ctx.app.log.debug(`Sharing feedback flow draft ${JSON.stringify(flow)}`);
                const edge = {
                    node: formattedFlow,
                    cursor: formattedFlow.id,
                };
                ctx.pubsub.publish({
                    topic: 'feedbackFlowPrompted',
                    payload: {
                        feedbackFlowPrompted: edge,
                        isDraft: false,
                        prompterId: ctx.viewer.id,
                        eventId: flow.eventId,
                    },
                });
                return edge;
            });
        },
        reshareFeedbackFlow(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.flowId) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: flowId } = fromGlobalId(args.flowId);
                const flow = await FeedbackFlowMethods.findFeedbackFlowByFlowId(flowId, ctx.prisma);
                const formattedFlow = toFeedbackFlowId(flow);
                ctx.app.log.debug(`Resharing feedback flow ${JSON.stringify(flow)}`);
                const edge = {
                    node: formattedFlow,
                    cursor: formattedFlow.id,
                };
                ctx.pubsub.publish({
                    topic: 'feedbackFlowPrompted',
                    payload: {
                        feedbackFlowPrompted: edge,
                        isDraft: false,
                        prompterId: ctx.viewer.id,
                        eventId: flow.eventId,
                    },
                });
                return edge;
            });
        },
        createFeedbackPromptFlowResponse(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                if (!args.input) throw new ProtectedError({ userMessage: errors.invalidArgs });
                const { id: flowId } = fromGlobalId(args.input.flowId);
                await FeedbackFlowMethods.createFeedbackPromptFlowResponse(ctx.viewer.id, ctx.prisma, args.input);

                // Cache that user has responded to this prompt
                const REDIS_EXPIRATION = 60 * 60 * 24; // 1 day in seconds
                ctx.redis.set(`feedbackPromptFlowResponse:${flowId}:${ctx.viewer.id}`, 'true', 'EX', REDIS_EXPIRATION);

                return true;
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
            subscribe: withFilter<{
                feedbackPrompted: EventLiveFeedbackPromptEdge;
                isDraft: boolean;
                prompterId: string;
            }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackPrompted'),
                async (payload, args, ctx) => {
                    // Check that user is logged in
                    if (!ctx.viewer.id) return false;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // Check that user is not the prompter (already handled by mutation)
                    const prompterId = payload.prompterId;
                    if (ctx.viewer.id === prompterId) return false;
                    const isDraft = payload.isDraft;
                    if (isDraft) {
                        // Check if user is a moderator, if so, share the draft prompt with them
                        return isModerator(ctx.viewer.id, eventId, ctx.prisma);
                    }
                    // Check that user has not already responded to this prompt
                    const { id: feedbackPromptId } = fromGlobalId(payload.feedbackPrompted.node.id);

                    const hasResponded = await ctx.redis.get(
                        `feedbackPromptResponse:${feedbackPromptId}:${ctx.viewer.id}`
                    );
                    if (hasResponded) return false;
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
        feedbackFlowPrompted: {
            subscribe: withFilter<{
                feedbackFlowPrompted: FeedbackFlowEdge;
                isDraft: boolean;
                prompterId: string;
                eventId: string;
            }>(
                (_parent, _args, ctx) => ctx.pubsub.subscribe('feedbackFlowPrompted'),
                async (payload, args, ctx) => {
                    if (!ctx.viewer.id) return false;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // Check that user is not the prompter (already handled by mutation)
                    const prompterId = payload.prompterId;
                    if (ctx.viewer.id === prompterId) return false;
                    const isDraft = payload.isDraft;
                    if (isDraft) {
                        // Check if user is a moderator, if so, share the draft prompt with them
                        return isModerator(ctx.viewer.id, eventId, ctx.prisma);
                    }
                    const { id: flowId } = fromGlobalId(payload.feedbackFlowPrompted.node.id);
                    const hasResponded = await ctx.redis.get(`feedbackPromptFlowResponse:${flowId}:${ctx.viewer.id}`);
                    if (hasResponded) return false;

                    return payload.eventId === eventId;
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
        async voteViewpoints(parent, args, ctx) {
            const { id: promptId } = fromGlobalId(parent.id);
            const voteViewpoints = await Feedback.findVoteViewpointsByPromptId(promptId, ctx.prisma);
            return voteViewpoints;
        },
    },
    EventLiveFeedbackPromptResponse: {
        async createdBy(parent, args, ctx) {
            const { id: responseId } = fromGlobalId(parent.id);
            const submitter = await Feedback.findSubmitterByResponseId(responseId, ctx.prisma);
            return toUserId(submitter);
        },
    },
    FeedbackFlow: {
        async prompts(parent, args, ctx) {
            const { id: globalFeedbackFlowId } = fromGlobalId(parent.id);
            const prompts = await FeedbackFlowMethods.findPromptsByFlowId(globalFeedbackFlowId, ctx.prisma);
            return prompts.map(toFeedbackFlowPromptId);
        },
    },
    FeedbackFlowPrompt: {
        async prompt(parent, args, ctx) {
            const { id: promptId } = fromGlobalId(parent.id);
            const feedbackFlowPrompt = await FeedbackFlowMethods.findFeedbackFlowPromptById(promptId, ctx.prisma);
            const prompt = feedbackFlowPrompt.prompt;
            return toFeedbackPromptId(prompt);
        },
    },
};
