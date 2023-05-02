import { fromGlobalId } from 'graphql-relay';
import type { CookieSerializeOptions } from 'fastify-cookie';

import * as jwt from '@local/lib/jwt';
import * as Invites from './methods';
import { Resolvers, errors, runMutation, toGlobalId } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';

const toUserId = toGlobalId('User');

const cookieOptions: CookieSerializeOptions = {
    sameSite: 'lax',
};

export const resolvers: Resolvers = {
    Query: {
        async validateInvite(parent, args, ctx) {
            const { id: viewerId } = ctx.viewer;
            const { id: eventId } = fromGlobalId(args.input.eventId);
            const { token } = args.input;
            if (!token) return { valid: false, user: null };
            const { valid, user } = await Invites.validateInvite(token, eventId, ctx.prisma);
            if (!user) return { valid, user: null };
            // If the user is already logged in, there is no need to set the cookie again.
            if (viewerId) return { valid, user: toUserId(user) };
            const loginToken = await jwt.sign({ id: toUserId(user).id });
            ctx.reply.setCookie('jwt', loginToken, cookieOptions);
            return { valid, user: toUserId(user) };
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
