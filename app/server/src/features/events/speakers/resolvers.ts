import { EventQuestion } from '@app/prisma';
import { Resolvers, withFilter } from '@local/features/utils';
import * as Speaker from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        addSpeaker(parent, args, ctx, info) {
            return Speaker.createSpeaker(ctx.userId, ctx.prisma, args.input);
        },
        removeSpeaker(parent, args, ctx, info) {
            return Speaker.deleteSpeaker(ctx.userId, ctx.prisma, args.input);
        },
        updateSpeaker(parent, args, ctx, info) {
            return Speaker.updateSpeaker(ctx.userId, ctx.prisma, args.input);
        },
    },
    EventSpeaker: {
        user(parent, args, ctx, info) {
            return Speaker.findSpeakerAcc(parent.email, ctx.prisma);
        },
    },
};
