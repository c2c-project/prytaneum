import { fromGlobalId } from 'graphql-relay';

import * as Participants from './methods';
import { Resolvers, errors, runMutation, toGlobalId } from '@local/features/utils';
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
    },
};
