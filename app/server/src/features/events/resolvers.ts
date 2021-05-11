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
        startEvent(parent, args, ctx, info) {
            return Event.changeEventStatus(ctx.userId, ctx.prisma, args.eventId, true);
        },
        endEvent(parent, args, ctx, info) {
            return Event.changeEventStatus(ctx.userId, ctx.prisma, args.eventId, false);
        },
    },
    Event: {
        speakers(parent, args, ctx, info) {
            return Event.findSpeakersByEventId(parent.eventId, ctx.prisma);
        },
        videos(parent, args, ctx, info) {
            return Event.findVideosByEventId(parent.eventId, ctx.prisma);
        },
        moderators(parent, args, ctx, info) {
            return Event.findModeratorsByEventId(parent.eventId, ctx.prisma);
        },
        organization(parent, args, ctx, info) {
            return Event.findOrgByEventId(parent.eventId, ctx.prisma);
        },
        questions(parent, args, ctx, info) {
            return Event.findQuestionsByEventId(parent.eventId, ctx.prisma);
        },
    },
};
