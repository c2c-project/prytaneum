/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import { Resolvers, toGlobalId, errors } from '@local/features/utils';
import * as Event from './methods';

const toEventId = toGlobalId('Event');
const toUserId = toGlobalId('User');

export const resolvers: Resolvers = {
    Query: {
        async events(parent, args, ctx, info) {
            const foundEvents = await Event.findPublicEvents(ctx.prisma);
            return foundEvents.map(toEventId);
        },
    },
    Mutation: {
        async createEvent(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const createdEvent = await Event.createEvent(ctx.viewer.id, ctx.prisma, args.event);
            return toEventId(createdEvent);
        },
        async updateEvent(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const updatedEvent = await Event.updateEvent(ctx.viewer.id, ctx.prisma, args.event);
            return toEventId(updatedEvent);
        },
        async deleteEvent(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const deletedEvent = await Event.deleteEvent(ctx.viewer.id, ctx.prisma, args.event);
            return toEventId(deletedEvent);
        },
        async startEvent(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, args.eventId, true);
            return toEventId(updatedEvent);
        },
        async endEvent(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, args.eventId, false);
            return toEventId(updatedEvent);
        },
    },
    Event: {
        speakers(parent, args, ctx, info) {
            return Event.findSpeakersByEventId(parent.id, ctx.prisma);
        },
        async videos(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const videos = await Event.findVideosByEventId(eventId, ctx.prisma);
            return connectionFromArray(videos, args);
        },
        async moderators(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const foundMods = await Event.findModeratorsByEventId(eventId, ctx.prisma);
            if (!foundMods) return null;
            return connectionFromArray(foundMods.map(toUserId), args);
        },
        organization(parent, args, ctx, info) {
            return Event.findOrgByEventId(parent.id, ctx.prisma);
        },
        questions(parent, args, ctx, info) {
            return Event.findQuestionsByEventId(parent.id, ctx.prisma);
        },
        isViewerModerator(parent, args, ctx, info) {
            return Event.isModerator(ctx.viewer.id, parent.id, ctx.prisma);
        },
    },
};
