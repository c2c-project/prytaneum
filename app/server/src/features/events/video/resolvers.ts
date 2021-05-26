import { Resolvers, errors } from '@local/features/utils';
import * as Video from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        addVideo(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Video.addVideo(ctx.viewer.id, ctx.prisma, args.input);
        },
        removeVideo(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Video.removeVideo(ctx.viewer.id, ctx.prisma, args.input);
        },
        updateVideo(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Video.updateVideo(ctx.viewer.id, ctx.prisma, args.input);
        },
    },
};
