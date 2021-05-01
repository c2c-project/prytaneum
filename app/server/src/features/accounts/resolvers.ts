import * as User from './methods';
import { Resolvers } from '@local/features/utils';

export const resolvers: Resolvers = {
    Query: {
        me(parent, input, ctx, info) {
            return User.userById(ctx.userId, ctx.prisma);
        },
    },
    User: {
        organizations(parent, input, ctx, info) {
            return User.userOrgs(ctx.userId, ctx.prisma);
        },
    },
};
