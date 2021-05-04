import { Resolvers } from '@local/features/utils';
import * as User from './methods';

export const resolvers: Resolvers = {
    Query: {
        me(parent, args, ctx, info) {
            return User.userById(ctx.userId, ctx.prisma);
        },
    },
    User: {
        organizations(parent, args, ctx, info) {
            return User.userOrgs(ctx.userId, ctx.prisma);
        },
    },
    Mutation: {
        async register(parent, args, ctx, info) {
            return User.registerSelf(ctx.prisma, args.input);
        },
        async login(parent, args, ctx, info) {
            const { user, token } = await User.loginWithPassword(ctx.prisma, args.input);
            ctx.reply.setCookie('jwt', token);
            return user;
        },
    },
};
