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
            return Event.changeEventStatus(ctx.userId, ctx.prisma, args.id, true);
        },
        endEvent(parent, args, ctx, info) {
            return Event.changeEventStatus(ctx.userId, ctx.prisma, args.id, false);
        },
    },
    Event: {
        speakers(parent, args, ctx, info) {
            return Event.findSpeakersByEventId(parent.id, ctx.prisma);
        },
        videos(parent, args, ctx, info) {
            return Event.findVideosByEventId(parent.id, ctx.prisma);
        },
        moderators(parent, args, ctx, info) {
            return Event.findModeratorsByEventId(parent.id, ctx.prisma);
        },
        organization(parent, args, ctx, info) {
            return Event.findOrgByid(parent.id, ctx.prisma);
        },
        questions(parent, args, ctx, info) {
            return Event.findQuestionsByid(parent.id, ctx.prisma);
        },
    },
};
