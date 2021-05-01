import { Resolvers } from '@local/features/utils';
import * as Moderation from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        hideQuestion(parent, args, ctx, info) {
            return Moderation.hideQuestionById(ctx.userId, ctx.prisma, args.input);
        },
    },
};
