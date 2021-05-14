import { Resolvers } from '@local/features/utils';
import * as Video from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        addVideo(parent, args, ctx, info) {
            return Video.addVideo(ctx.userId, ctx.prisma, args.input);
        },
        removeVideo(parent, args, ctx, info) {
            return Video.removeVideo(ctx.userId, ctx.prisma, args.input);
        },
        updateVideo(parent, args, ctx, info) {
            return Video.updateVideo(ctx.userId, ctx.prisma, args.input);
        },
    },
};
