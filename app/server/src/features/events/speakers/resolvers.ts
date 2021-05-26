import { Resolvers, errors } from '@local/features/utils';
import * as Speaker from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        addSpeaker(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Speaker.createSpeaker(ctx.viewer.id, ctx.prisma, args.input);
        },
        removeSpeaker(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Speaker.deleteSpeaker(ctx.viewer.id, ctx.prisma, args.input);
        },
        updateSpeaker(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            return Speaker.updateSpeaker(ctx.viewer.id, ctx.prisma, args.input);
        },
    },
    EventSpeaker: {
        user(parent, args, ctx, info) {
            // TODO: this is dumb, figure out a better way to model this in the db probably?
            // I probably have a userId on the parent or something idk too tired atm
            if (!parent.email) return null;
            return Speaker.findSpeakerAccByEmail(parent.email, ctx.prisma);
        },
    },
};
