import { Resolvers } from './utils';
import * as Root from './methods';

export const resolvers: Resolvers = {
    Query: {
        node(parent, args, ctx, info) {
            return Root.getNode(args.id, ctx.prisma);
        },
    },
    Node: {
        __resolveType(parent, ctx) {
            return Root.resolveType(parent);
        },
    },
};
