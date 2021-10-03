/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import { Resolvers, toGlobalId, errors, runMutation, withFilter } from '@local/features/utils';
import type { Event as TEvent } from '@local/graphql-types';
import * as Event from './methods';

const toEventId = toGlobalId('Event');
const toUserId = toGlobalId('User');
const toVideoId = toGlobalId('EventVideo');
const toQuestionId = toGlobalId('EventQuestion');
const toSpeakerId = toGlobalId('EventSpeaker');
const toOrgId = toGlobalId('Organization');

export const resolvers: Resolvers = {
    Query: {
        async events(parent, args, ctx, info) {
            const foundEvents = await Event.findPublicEvents(ctx.prisma);
            return foundEvents.map(toEventId);
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
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: orgId } = fromGlobalId(args.event.orgId);
                const createdEvent = await Event.createEvent(ctx.viewer.id, ctx.prisma, {
                    ...args.event,
                    orgId,
                });
                return toEventId(createdEvent);
            });
        },
        async updateEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const updatedEvent = await Event.updateEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
        async deleteEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const deletedEvent = await Event.deleteEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                return toEventId(deletedEvent);
            });
        },
        async startEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, true);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
        async endEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, false);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
    },
    Subscription: {
        eventUpdates: {
            subscribe: withFilter<{ eventUpdates: TEvent }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventUpdates'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(payload.eventUpdates.id);
                    const { id: argEventId } = fromGlobalId(args.eventId);
                    return eventId === argEventId;
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
            const questions = await Event.findQuestionsByEventId(eventId, ctx.prisma);
            return connectionFromArray(questions.map(toQuestionId), args);
        },
        isViewerModerator(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            return Event.isModerator(ctx.viewer.id, eventId, ctx.prisma);
        },
        async queuedQuestions(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findQueuedQuestionsByEventId(eventId, ctx.prisma);
            if (!queryResult) return connectionFromArray([], args);
            const { questions } = queryResult;
            const edges = questions
                .map(toQuestionId)
                .map((question) => ({ node: question, cursor: question.position.toString() }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: edges[0].cursor.toString() || null,
                    endCursor: edges[questions.length - 1].cursor.toString() || null,
                },
            };
        },
    },
};
