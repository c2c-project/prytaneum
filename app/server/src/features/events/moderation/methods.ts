import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';
import { AddModerator, HideQuestion, ReorderQuestion } from '@local/graphql-types';

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

type AddModInput = Maybe<AddModerator> | undefined;
/**
 * Add a moderator to the event
 */
export async function addModerator(userId: Maybe<string>, prisma: PrismaClient, input: AddModInput) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { eventId, email } = input;

    // permission check
    const memberResults = await prisma.event.findUnique({
        where: { eventId },
        select: { organization: { select: { members: { where: { userId } } } } },
    });
    const hasPermissions = memberResults?.organization.members.find(({ userId: memberId }) => memberId === userId);
    if (!hasPermissions) throw new Error(errors.permissions);

    // check if email already exists
    const userResult = await prisma.user.findFirst({ where: { email } });
    if (userResult) {
        prisma.eventModerator.create({
            data: {
                userId: userResult.userId,
                eventId,
            },
        });
    } else {
        // creat the user first
        // const user = await prisma.user.create
        // // TODO: register with password
    }
}
