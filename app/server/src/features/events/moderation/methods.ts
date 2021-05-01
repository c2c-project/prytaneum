import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';
import { HideQuestion, ReorderQuestion } from '@local/graphql-types';

/**
 * given a user id and event id, determine if the user is a moderator
 */
async function isModerator(userId: string, eventId: string, prisma: PrismaClient) {
    const result = await prisma.eventModerator.findUnique({ where: { eventId_userId: { userId, eventId } } });
    return Boolean(result);
}

type HideInput = Maybe<HideQuestion> | undefined;

/**
 * Update the isVisible Value
 */
export async function hideQuestionById(userId: Maybe<string>, prisma: PrismaClient, input: HideInput) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { questionId, eventId, toggleTo } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.eventQuestion.update({
        where: {
            questionId,
        },
        data: {
            isVisible: toggleTo,
        },
    });
}

type ReorderInput = Maybe<ReorderQuestion> | undefined;

/**
 * update question order by updating a single questions position value
 */
export async function reorderQuestion(userId: Maybe<string>, prisma: PrismaClient, input: ReorderInput) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { questionId, eventId, position } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.eventQuestion.update({
        where: {
            questionId,
        },
        data: {
            position,
        },
    });
}
