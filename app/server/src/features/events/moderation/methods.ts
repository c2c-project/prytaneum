import { PrismaClient } from '@app/prisma';
import { Maybe, errors } from '@local/features/utils';
import { AddModerator, HideQuestion, ReorderQuestion } from '@local/graphql-types';
import { register } from '@local/features/accounts/methods';

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

    // create user if email is not in accounts system
    let modUserId = userResult?.userId;
    if (!modUserId) {
        const regResult = await register(prisma, { email: input.email });
        modUserId = regResult.userId;
    }

    return prisma.eventModerator.create({
        data: {
            userId: modUserId,
            eventId,
        },
    });
}

/**
 * checks if the given feedback id matches the event
 * TODO: some sort of validation? it doesn't make sense to do this here really?
 * how do we know only a moderator is getting this info? maybe in the context?
 */
export async function isEventRelevant(eventId: string, prisma: PrismaClient, feedbackId: string) {
    const result = await prisma.eventLiveFeedback.findFirst({ where: { eventId, feedbackId } });
    return Boolean(result);
}

/**
 * decrements or increments the current question
 */
export async function changeCurrentQuestion(
    userId: Maybe<string>,
    prisma: PrismaClient,
    eventId: string,
    change: 1 | -1
) {
    if (!userId) throw new Error(errors.noLogin);

    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    const result = await prisma.event.update({
        where: { eventId },
        data: { currentQuestion: { increment: change } },
        select: { currentQuestion: true },
    });
    return result.currentQuestion;
}
