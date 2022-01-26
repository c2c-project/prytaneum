import { Resolvers } from './utils';
import * as Root from './methods';

export const resolvers: Resolvers = {
    Query: {
        node(parent, args, ctx) {
            return Root.getNode(args.id, ctx.prisma);
        },
    },
    Node: {
        __resolveType(parent) {
            return Root.resolveType(parent);
        },
    },
};
