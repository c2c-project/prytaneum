import { fromGlobalId } from 'graphql-relay';
import * as Invites from './methods';
import { Resolvers, errors, runMutation } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';

export const resolvers: Resolvers = {
    Query: {
        async validateInvite(parent, args, ctx) {
            const { id: eventId } = fromGlobalId(args.input.eventId);
            const { token } = args.input;
            if (!token) return { valid: false };
            return Invites.validateInvite(token, eventId, ctx.prisma);
        },
    },
    Mutation: {
        async createInvite(parent, args, ctx) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                return Invites.invite(ctx.viewer.id, ctx.prisma, args.input);
            });
        },
    },
};
