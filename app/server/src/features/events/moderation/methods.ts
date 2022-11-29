import { PrismaClient } from '@local/__generated__/prisma';
import { errors } from '@local/features/utils';
import { register } from '@local/features/accounts/methods';
import { ProtectedError } from '@local/lib/ProtectedError';
import type {
    CreateModerator,
    DeleteModerator,
    HideQuestion,
    UpdateQuestionPosition,
    AddQuestionToQueue,
    RemoveQuestionFromQueue,
} from '@local/graphql-types';

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
    return !!result;
}

/**
 * Update the isVisible Value
 */
export async function hideQuestionById(userId: string, prisma: PrismaClient, input: HideQuestion) {
    const { questionId, eventId, toggleTo } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

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
export async function updateQuestionPosition(userId: string, prisma: PrismaClient, input: UpdateQuestionPosition) {
    const { questionId, eventId, position } = input;

    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

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
    if (!hasPermissions) throw new ProtectedError({ userMessage: errors.permissions });

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
 * NOTE: race condition is here!!, probably better to use another server that would instantiate a session for us during a live event
 * but this is sufficient for now
 * OR another solution is to use $queryRaw and $executeRaw to write the appropriate logic as one sql query/statement
 * TODO: delete
 */
export async function changeCurrentQuestion(userId: string, prisma: PrismaClient, eventId: string, change: 1 | -1) {
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    // first find the event's current question
    const dbEvent = await prisma.event.findUnique({
        where: { id: eventId },
        select: { currentQuestion: true },
    });

    if (!dbEvent)
        throw new ProtectedError({
            userMessage: ProtectedError.internalServerErrorMessage,
            internalMessage: `Could not find event with id ${eventId}.`,
        });

    // the "next" question, where next can be +1 or -1
    const nextQuestion = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            AND: [{ position: { [change === 1 ? 'gt' : 'lt']: dbEvent.currentQuestion } }, { position: { not: BigInt(-1) } }],
        },
        orderBy: { position: change === 1 ? 'asc' : 'desc' },
    });

    // could be null and that's okay, since we don't always have a currentQuestion -- start of event for example
    const currentQuestion = await prisma.eventQuestion.findFirst({
        where: { position: dbEvent.currentQuestion, eventId },
    });

    if (!nextQuestion && !currentQuestion)
        throw new ProtectedError({ userMessage: `Cannot move ${change === -1 ? 'back' : 'forward'}` });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: BigInt(nextQuestion?.position ?? -1) },
        select: { currentQuestion: true, id: true },
    });
    return { event: updatedEvent, newCurrentQuestion: nextQuestion, prevCurrentQuestion: currentQuestion };
}

async function getCurrentQuestionPosition(eventId: string, prisma: PrismaClient) {
    const result = await prisma.event.findUnique({
        where: { id: eventId },
        select: { currentQuestion: true },
    });
    return result?.currentQuestion;
}

export async function decrementQuestion(userId: string, prisma: PrismaClient, eventId: string) {
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const currentQuestionPosition = await getCurrentQuestionPosition(eventId, prisma);
    const nextQuestionPosition = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            position: { lt: BigInt(currentQuestionPosition ?? -1) },
        },
        orderBy: { position: 'desc' },
        select: { position: true },
    });

    if (!nextQuestionPosition) throw new ProtectedError({ userMessage: 'Cannot increment question' });

    const prevCurrentQuestion = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            position: { equals: currentQuestionPosition ? BigInt(currentQuestionPosition) : undefined },
        },
    });

    if (!prevCurrentQuestion) throw new ProtectedError({ userMessage: 'Could not find previous question.' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: BigInt(nextQuestionPosition.position) },
        select: { currentQuestion: true, id: true },
    });

    return {
        event: updatedEvent,
        prevCurrentQuestion,
    };
}

export async function incrementQuestion(userId: string, prisma: PrismaClient, eventId: string) {
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });
    const currentQuestionPosition = await getCurrentQuestionPosition(eventId, prisma);
    const nextQuestion = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            position: { gt: currentQuestionPosition ?? -1 },
        },
        orderBy: { position: 'asc' },
    });

    if (!nextQuestion) throw new ProtectedError({ userMessage: 'Cannot increment question' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: BigInt(nextQuestion.position) },
        select: { currentQuestion: true, id: true },
    });

    return {
        event: updatedEvent,
        newCurrentQuestion: nextQuestion,
        prevCurrentQuestionPosition: currentQuestionPosition,
    };
}

/**
 * UNIMPLEMENTED
 * currently, there's nothing to update, but in the future we may have more fine grained mod permissions
 * but for now it's better if the organizer must remove and then re-add a different
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateModerator(userId: string, eventId: string, prisma: PrismaClient) {
    return null;
}

export async function deleteModerator(userId: string, prisma: PrismaClient, input: DeleteModerator) {
    const { userId: modId, eventId } = input;
    const hasPermission = await isMember(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });
    const deletedModerator = await prisma.eventModerator.delete({
        where: { eventId_userId: { eventId, userId: modId } },
    });
    return prisma.user.findUnique({ where: { id: deletedModerator.userId } });
}

export async function addQuestionToQueue(userId: string, prisma: PrismaClient, input: AddQuestionToQueue) {
    // permission check
    const hasPermission = await isModerator(userId, input.eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const currentTimeMs = new Date().getTime();
    const currentTimeMsStr = currentTimeMs.toString();

    // 13 digits long (BigInt)
    const calculatedPosition = BigInt(currentTimeMsStr);

    // check if id is already non-negative
    const question = await prisma.eventQuestion.findFirst({ where: { id: input.questionId, position: BigInt(-1) } });
    // if the question isn't found with the -1 position, then it's already in queue
    if (!question) throw new ProtectedError({ userMessage: 'Question is already in queue.' });

    return prisma.eventQuestion.update({
        where: { id: input.questionId },
        data: {
            position: calculatedPosition,
        },
    });
}

export async function removeQuestionFromQueue(userId: string, prisma: PrismaClient, input: RemoveQuestionFromQueue) {
    const { eventId, questionId } = input;
    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    // Find current question
    const event = await prisma.event.findUnique({
        where: { id: input.eventId },
        select: { currentQuestion: true },
    });
    if (!event)
        throw new ProtectedError({
            userMessage: ProtectedError.internalServerErrorMessage,
            internalMessage: `Could not find event with id ${eventId}.`,
        });

    const toBeRemoved = await prisma.eventQuestion.findUnique({ where: { id: questionId } });
    if (!toBeRemoved) throw new ProtectedError({ userMessage: 'Question cannot be found.' });
    // Check if the question is in the question record
    // All questions in the question record shoud have a position greater than or equal to the current question
    if (event.currentQuestion >= toBeRemoved.position) {
        throw new ProtectedError({
            userMessage: 'Cannot remove question that has already been asked.',
            internalMessage: `Cannot remove question that has already been asked. Current question position: ${event.currentQuestion} | Question being dequeud position: ${toBeRemoved.position}`,
        });
    }

    // Set the position to -1 to remove it from the queue
    return prisma.eventQuestion.update({
        where: { id: questionId },
        data: {
            position: BigInt(-1),
        },
    });
}

export async function findUserIdByEmail(email: string, prisma: PrismaClient) {
    return prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });
}
