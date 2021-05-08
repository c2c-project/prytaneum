import { Resolvers } from '@local/features/utils';
import * as Event from './methods';

export const resolvers: Resolvers = {
    Query: {
        eventById(parent, args, ctx, info) {
            return Event.eventById(ctx.prisma, args.id);
        },
        events(parent, args, ctx, info) {
            return Event.findPublicEvents(ctx.prisma);
        },
    },
    Mutation: {
        createEvent(parent, args, ctx, info) {
            return Event.createEvent(ctx.userId, ctx.prisma, args.event);
        },
        updateEvent(parent, args, ctx, info) {
            return Event.updateEvent(ctx.userId, ctx.prisma, args.event);
        },
        deleteEvent(parent, args, ctx, info) {
            return Event.deleteEvent(ctx.userId, ctx.prisma, args.event);
        },
        startEvent() {
            return null;
        },
        endEvent() {
            return null;
        },
        createFeedback() {
            return null;
        },
    },
    Event: {
        speakers(parent, args, ctx, info) {
            return Event.findSpeakersByEventId(parent.eventId, ctx.prisma);
        },
        videos(parent, args, ctx, info) {
            return Event.findVideosByEventId(parent.eventId, ctx.prisma);
        },
        moderators(parent, arg, ctx, info) {
            return Event.findModeratorsByEventId(parent.eventId, ctx.prisma);
        },
        organization(parent, arg, ctx, info) {
            return Event.findOrgByEventId(parent.eventId, ctx.prisma);
        }
    },
};
