/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import { Resolvers, toGlobalId, runMutation } from '@local/features/utils';
import * as User from './methods';

const toUserId = toGlobalId('User');
const toOrgId = toGlobalId('Organization');

export const resolvers: Resolvers = {
    Query: {
        async me(parent, args, ctx, info) {
            if (!ctx.viewer.id) return null; // can't lookup "me" if not logged in
            const user = await User.findUserById(ctx.viewer.id, ctx.prisma);
            return toUserId(user);
        },
    },
    User: {
        async organizations(parent, args, ctx, info) {
            const { id: userId } = fromGlobalId(parent.id);
            const userOrgs = await User.findOrgsByUserId(userId, ctx.prisma);
            if (!userOrgs) return null;
            return connectionFromArray(userOrgs.map(toOrgId), args);
        },
    },
    Mutation: {
        async register(parent, args, ctx, info) {
            return runMutation(async () => {
                const registeredUser = await User.registerSelf(ctx.prisma, args.input);
                return toUserId(registeredUser);
            });
        },
        async login(parent, args, ctx, info) {
            return runMutation(async () => {
                const { user, token } = await User.loginWithPassword(ctx.prisma, args.input);
                ctx.reply.setCookie('jwt', token);
                return toUserId(user);
            });
        },
        logout(parent, args, ctx, info) {
            ctx.reply.clearCookie('jwt');
            return new Date();
        },
    },
};
