import { fromGlobalId } from 'graphql-relay';

import * as Participants from './methods';
import { Resolvers, errors, runMutation, toGlobalId, withFilter } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';

const toUserId = toGlobalId('User');

export const resolvers: Resolvers = {
    Query: {
        async eventParticipants(parent, args, ctx) {
            const { id: viewerId } = ctx.viewer;
            const { id: eventId } = fromGlobalId(args.eventId);
            if (!viewerId) throw new ProtectedError({ userMessage: errors.noLogin });
            // TODO: check if user is allowed to see participants
            const participants = await Participants.getByEvent(ctx.prisma, eventId);
            return participants.map(({ user, isMuted }) => ({ user: toUserId(user), isMuted }));
        },
    },
    Mutation: {
        async participantPingEvent(parent, args, ctx) {
            return runMutation(async () => {
                const { id: viewerId } = ctx.viewer;
                const { id: eventId } = fromGlobalId(args.eventId);
                if (!viewerId) throw new ProtectedError({ userMessage: errors.noLogin });
                await Participants.joinOrPingEvent(ctx.prisma, eventId, viewerId);
            });
        },
        async participantLeaveEvent(parent, args, ctx) {
            return runMutation(async () => {
                const { id: viewerId } = ctx.viewer;
                const { id: eventId } = fromGlobalId(args.eventId);
                if (!viewerId) throw new ProtectedError({ userMessage: errors.noLogin });
                await Participants.leaveEvent(ctx.prisma, eventId, viewerId);
            });
        },
        async muteParticipant(parent, args, ctx) {
            return runMutation(async () => {
                const { id: viewerId } = ctx.viewer;
                const { id: eventId } = fromGlobalId(args.eventId);
                const { id: userId } = fromGlobalId(args.userId);
                if (!viewerId) throw new ProtectedError({ userMessage: errors.noLogin });
                await Participants.muteParticipant(ctx.prisma, eventId, userId, viewerId);
                ctx.pubsub.publish({
                    topic: 'participantMuted',
                    payload: {
                        participantMuted: true,
                        eventId,
                    },
                });
            });
        },
        async unmuteParticipant(parent, args, ctx) {
            return runMutation(async () => {
                const { id: viewerId } = ctx.viewer;
                const { id: eventId } = fromGlobalId(args.eventId);
                const { id: userId } = fromGlobalId(args.userId);
                if (!viewerId) throw new ProtectedError({ userMessage: errors.noLogin });
                await Participants.unmuteParticipant(ctx.prisma, eventId, userId, viewerId);
                ctx.pubsub.publish({
                    topic: 'participantMuted',
                    payload: {
                        participantMuted: false,
                        eventId,
                    },
                });
            });
        },
    },
    Subscription: {
        participantMuted: {
            subscribe: withFilter<{ participantMuted: boolean; eventId: string }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('participantMuted'),
                (payload, args, ctx) => {
                    if (!ctx.viewer.id) return false;
                    const { id: eventId } = fromGlobalId(args.eventId);
                    const { eventId: payloadEventId } = payload;
                    return eventId === payloadEventId;
                }
            ),
        },
    },
};
