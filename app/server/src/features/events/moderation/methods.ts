import { PrismaClient } from '@app/prisma';
import { errors } from '@local/features/utils';
import { CreateModerator, DeleteModerator, HideQuestion, ReorderQuestion, UpdateModerator } from '@local/graphql-types';
import { register } from '@local/features/accounts/methods';

async function isMember(userId: string, eventId: string, prisma: PrismaClient) {
    const memberResults = await prisma.event.findUnique({
        where: { id: eventId },
        select: { organization: { select: { members: { where: { userId } } } } },
    });

    // can't be a member if there are no members or no event or something
    if (!memberResults) return false;

    // double check that the user is within the array of, what should be, 1 element
    const _isMember = memberResults.organization.members.find(({ userId: memberId }) => memberId === userId);

    // return the result
    return Boolean(_isMember);
}

/**
 * given a user id and event id, determine if the user is a moderator
 */
export async function isModerator(userId: string | null, eventId: string, prisma: PrismaClient) {
    if (!userId) return false;
    const result = await prisma.eventModerator.findUnique({ where: { eventId_userId: { userId, eventId } } });
    return Boolean(result);
}

/**
 * Update the isVisible Value
 */
export async function hideQuestionById(userId: string, prisma: PrismaClient, input: HideQuestion) {
    const { questionId, eventId, toggleTo } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.eventQuestion.update({
        where: {
            id: questionId,
        },
        data: {
            isVisible: toggleTo,
        },
    });
}

/**
 * update question order by updating a single questions position value
 */
export async function reorderQuestion(userId: string, prisma: PrismaClient, input: ReorderQuestion) {
    const { questionId, eventId, position } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    return prisma.eventQuestion.update({
        where: {
            id: questionId,
        },
        data: {
            position,
        },
    });
}

/**
 * Add a moderator to the event
 */
export async function createModerator(userId: string, prisma: PrismaClient, input: CreateModerator) {
    const { eventId, email } = input;

    // permission check
    const hasPermissions = await isMember(userId, eventId, prisma);
    if (!hasPermissions) throw new Error(errors.permissions);

    // check if email already exists
    let userResult = await prisma.user.findFirst({ where: { email } });

    // create user if email is not in accounts system
    let modUserId = userResult?.id;
    if (!modUserId) {
        userResult = await register(prisma, { email: input.email });
        modUserId = userResult.id;
    }

    const result = await prisma.eventModerator.create({
        data: {
            userId: modUserId,
            eventId,
        },
    });

    if (result) return userResult;
    return null;
}

/**
 * checks if the given feedback id matches the event
 * TODO: some sort of validation? it doesn't make sense to do this here really?
 * how do we know only a moderator is getting this info? maybe in the context?
 */
export async function isEventRelevant(eventId: string, prisma: PrismaClient, feedbackId: string) {
    const result = await prisma.eventLiveFeedback.findFirst({ where: { eventId, id: feedbackId } });
    return Boolean(result);
}

/**
 * decrements or increments the current question
 */
export async function changeCurrentQuestion(userId: string, prisma: PrismaClient, id: string, change: 1 | -1) {
    const hasPermission = await isModerator(userId, id, prisma);
    if (!hasPermission) throw new Error(errors.permissions);

    const result = await prisma.event.update({
        where: { id },
        data: { currentQuestion: { increment: change } },
        select: { currentQuestion: true },
    });
    return result.currentQuestion;
}

/**
 * UNIMPLEMENTED
 * currently, there's nothing to update, but in the future we may have more fine grained mod permissions
 * but for now it's better if the organizer must remove and then re-add a different
 */
export async function updateModerator(userId: string, prisma: PrismaClient, input: UpdateModerator) {
    return null;
}

export async function deleteModerator(userId: string, prisma: PrismaClient, input: DeleteModerator) {
    const { userId: modId, eventId } = input;
    const hasPermission = await isMember(userId, eventId, prisma);
    if (!hasPermission) throw new Error(errors.permissions);
    const deletedModerator = await prisma.eventModerator.delete({
        where: { eventId_userId: { eventId, userId: modId } },
    });
    return prisma.user.findUnique({ where: { id: deletedModerator.userId } });
}
