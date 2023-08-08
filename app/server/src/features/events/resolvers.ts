/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Event from './methods';
import * as Moderation from '@local/features/events/moderation/methods';
import { Resolvers, toGlobalId, errors, runMutation, withFilter } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type {
    Event as TEvent,
    EventQuestion,
    EventEdgeContainer,
    EventBroadcastMessageEdgeContainer,
} from '@local/graphql-types';

const toEventId = toGlobalId('Event');
const toUserId = toGlobalId('User');
const toVideoId = toGlobalId('EventVideo');
const toQuestionId = toGlobalId('EventQuestion');
const toBroadcastMessageId = toGlobalId('EventBroadcastMessage');
const toSpeakerId = toGlobalId('EventSpeaker');
const toOrgId = toGlobalId('Organization');
const toFeedbackId = toGlobalId('EventLiveFeedback');
const toFeedbackPromptId = toGlobalId('EventLiveFeedbackPrompt');

export const resolvers: Resolvers = {
    Query: {
        async events(parent, args, ctx, info) {
            const foundEvents = await Event.findPublicEvents(ctx.prisma);
            return foundEvents.map(toEventId);
        },
        async event(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(args.eventId);
            const foundEvent = await Event.findEventById(eventId, ctx.prisma);
            return foundEvent ? toEventId(foundEvent) : null;
        },
        // async isEventPrivate(parent, args, ctx, info) {
        //     const isPrivateEvent = await Event.isEventPrivate(ctx.prisma,{ ...args.event, eventId }, status);
        //     if
        //     return isPrivateEvent.map(toEventId);
        // },
    },
    Mutation: {
        async createEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: orgId } = fromGlobalId(args.event.orgId);
                const createdEvent = await Event.createEvent(ctx.viewer.id, ctx.prisma, { ...args.event, orgId });
                const eventWithGlobalId = toEventId(createdEvent);
                const edge = {
                    node: eventWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'eventCreated',
                    payload: {
                        eventCreated: { edge },
                    },
                });
                return eventWithGlobalId;
            });
        },
        async updateEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const updatedEvent = await Event.updateEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: {
                        eventUpdates: eventWithGlobalId,
                    },
                });
                return eventWithGlobalId;
            });
        },
        async deleteEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const deletedEvent = await Event.deleteEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                const eventWithGlobalId = toEventId(deletedEvent);
                const edge = {
                    node: eventWithGlobalId,
                };
                ctx.pubsub.publish({
                    topic: 'eventDeleted',
                    payload: {
                        eventDeleted: { edge },
                    },
                });
                return eventWithGlobalId;
            });
        },
        async startEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, true);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: {
                        eventUpdates: eventWithGlobalId,
                    },
                });
                return eventWithGlobalId;
            });
        },
        async endEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, false);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: {
                        eventUpdates: eventWithGlobalId,
                    },
                });
                return eventWithGlobalId;
            });
        },
    },
    Subscription: {
        eventUpdates: {
            subscribe: withFilter<{ eventUpdates: TEvent }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventUpdates'),
                async (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(payload.eventUpdates.id);
                    const { id: userId } = fromGlobalId(args.userId);

                    const moderatorsIds = (await Event.findModeratorsByEventId(eventId, ctx.prisma)).map(
                        ({ id }) => id
                    );
                    const invitedIds = (await Event.findInvitedByEventId(eventId, ctx.prisma)).map(({ id }) => id);

                    return moderatorsIds.includes(userId) || invitedIds.includes(userId);
                }
            ),
        },
        eventCreated: {
            subscribe: withFilter<{ eventCreated: EventEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventCreated'),
                async (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(payload.eventCreated.edge.node.id);
                    const userId = ctx.viewer.id;
                    if (!userId) return false;

                    const moderatorsIds = (await Event.findModeratorsByEventId(eventId, ctx.prisma)).map(
                        ({ id }) => id
                    );
                    const invitedIds = (await Event.findInvitedByEventId(eventId, ctx.prisma)).map(({ id }) => id);

                    return moderatorsIds.includes(userId) || invitedIds.includes(userId);
                }
            ),
        },
        eventDeleted: {
            subscribe: withFilter<{ eventDeleted: EventEdgeContainer }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventDeleted'),
                async (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(payload.eventDeleted.edge.node.id);
                    const userEventIds = args.eventIds.map((userEventId: string) => fromGlobalId(userEventId).id);

                    return userEventIds.includes(eventId);
                }
            ),
        },
    },
    Event: {
        async speakers(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const speakers = await Event.findSpeakersByEventId(eventId, ctx.prisma);
            return connectionFromArray(speakers.map(toSpeakerId), args);
        },
        async videos(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const videos = await Event.findVideosByEventId(eventId, ctx.prisma);
            return connectionFromArray(videos.map(toVideoId), args);
        },
        async moderators(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const mods = await Event.findModeratorsByEventId(eventId, ctx.prisma);
            return connectionFromArray(mods.map(toUserId), args);
        },
        async organization(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const org = await Event.findOrgByEventId(eventId, ctx.prisma);
            return toOrgId(org);
        },
        async questions(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const { viewerOnly } = args;
            if (!!viewerOnly) {
                if (!ctx.viewer.id) return connectionFromArray([], args);
                const questions = await Event.findQuestionsByEventIdAndUser(eventId, ctx.viewer.id, ctx.prisma);
                return connectionFromArray(questions.map(toQuestionId), args);
            } else {
                const questions = await Event.findQuestionsByEventId(eventId, ctx.prisma);
                return connectionFromArray(questions.map(toQuestionId), args);
            }
        },
        async broadcastMessages(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const broadcastMessages = await Event.findBroadcastMessagesByEventId(eventId, ctx.prisma);
            const connection = connectionFromArray(broadcastMessages.map(toBroadcastMessageId), args);
            if (broadcastMessages.length === 0)
                connection.pageInfo = { ...connection.pageInfo, startCursor: '', endCursor: '' };
            return connection;
        },
        isViewerModerator(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            return Event.isModerator(ctx.viewer.id, eventId, ctx.prisma);
        },
        async liveFeedback(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findLiveFeedbackByEventId(eventId, ctx.prisma);
            if (!queryResult) return connectionFromArray([], args);
            const { feedback: liveFeedback } = queryResult;
            const edges = liveFeedback
                .map(toFeedbackId)
                .map((feedback) => ({ node: feedback, cursor: feedback.createdAt.getTime().toString() }));
            // TODO Filter the results if viewer is not a moderator
            return {
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: edges[0]?.cursor.toString(),
                    endCursor: edges[liveFeedback.length - 1]?.cursor.toString(),
                },
            };
        },
        async liveFeedbackPrompts(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findLiveFeedbackPromptsByEventId(eventId, ctx.prisma);
            const { feedbackPrompt: liveFeedbackPrompts } = queryResult || { feedbackPrompt: [] };
            const connection = connectionFromArray(liveFeedbackPrompts.map(toFeedbackPromptId), args);

            if (liveFeedbackPrompts.length === 0)
                connection.pageInfo = { ...connection.pageInfo, startCursor: '', endCursor: '' };
            return connection;
        },
        async questionQueue(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findQuestionQueueByEventId(eventId, ctx.prisma);
            const toQuestionEdge = (question: EventQuestion) => ({
                node: question,
                cursor: question.position,
            });
            const makeConnection = <T extends ReturnType<typeof toQuestionEdge>[]>(edges: T) => ({
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: edges.length > 0 ? edges[0].cursor : '',
                    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : '',
                },
            });
            if (!queryResult) return null;

            // many ways to do the following, done in similar ways for clarity
            const questionRecordEdges = queryResult.questions
                .filter((question) => parseInt(question.position) <= parseInt(queryResult.currentQuestion))
                .map(toQuestionId)
                .map(toQuestionEdge);
            const enqueuedQuestionsEdges = queryResult.questions
                .filter((question) => parseInt(question.position) > parseInt(queryResult.currentQuestion))
                .map(toQuestionId)
                .map(toQuestionEdge);
            return {
                questionRecord: makeConnection(questionRecordEdges),
                enqueuedQuestions: makeConnection(enqueuedQuestionsEdges),
            };
        },
        async participants(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const participants = await Event.findParticipantsByEventId(eventId, ctx.prisma);
            const formattedParticipants = participants.map((participant) => {
                return {
                    user: toUserId(participant.user),
                    isMuted: participant.isMuted,
                };
            });
            return connectionFromArray(formattedParticipants, args);
        },
        async isViewerInvited(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            ctx.app.log.debug(eventId);
            if (!ctx.viewer.id) return false;
            // Check if user is organizer or moderator (no need to check if invited when they are)
            const isModerator = await Moderation.isModerator(ctx.viewer.id, eventId, ctx.prisma);
            if (isModerator) return true;
            const isMember = await Moderation.isMember(ctx.viewer.id, eventId, ctx.prisma);
            if (isMember) return true;
            // Check if user is invited to the event
            return Event.isInvited(ctx.viewer.id, eventId, ctx.prisma);
        },
        async invited(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const { first, after } = args;
            const invited = await Event.findInvitedByEventId(eventId, ctx.prisma);
            const connection = connectionFromArray(invited.map(toUserId), args);
            if (invited.length === 0) connection.pageInfo = { ...connection.pageInfo, startCursor: '', endCursor: '' };
            return connection;
        },
    },
};
