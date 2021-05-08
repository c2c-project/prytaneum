import { EventQuestion } from '@app/prisma';
import { Resolvers, withFilter } from '@local/features/utils';
import * as Speaker from './methods';

export const resolvers: Resolvers = {
    EventSpeaker: {
        user(parent, args, ctx, info) {
            return Speaker.speakerAccount(parent.userId, ctx.prisma);
        },
    },
};
