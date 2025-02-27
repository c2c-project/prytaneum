import { EventType, Prisma, PrismaClient } from '@local/__generated__/prisma';
import { errors } from '@local/features/utils';
import { register } from '@local/features/accounts/methods';
import { ProtectedError } from '@local/lib/ProtectedError';
import {
    AddQuestionToOnDeck,
    AddQuestionToTopicQueue,
    EventQuestion,
    RemoveQuestionFromOnDeck,
    RemoveQuestionFromTopicQueue,
    UpdateTopicQueuePosition,
} from '../../../graphql-types';
import type {
    CreateModerator,
    DeleteModerator,
    HideQuestion,
    UpdateQuestionPosition,
    AddQuestionToQueue,
    RemoveQuestionFromQueue,
} from '@local/graphql-types';

export async function isMember(userId: string, eventId: string, prisma: PrismaClient) {
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
    let userResult = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });

    // create user if email is not in accounts system
    let modUserId = userResult?.id;
    if (!modUserId) {
        userResult = await register(prisma, { email: input.email.toLowerCase() });
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
            AND: [{ position: { [change === 1 ? 'gt' : 'lt']: dbEvent.currentQuestion } }, { position: { not: '-1' } }],
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
        data: { currentQuestion: nextQuestion?.onDeckPosition ?? '-1' },
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
    const position = parseInt(currentQuestionPosition || '-1');
    const queryResult: { position: string }[] = await prisma.$queryRaw(Prisma.sql`
        SELECT position FROM "EventQuestion"
        WHERE position::BigInt < ${position} AND position::BigInt > -1
        AND "eventId" = ${eventId}::uuid
        ORDER BY position::BigInt DESC LIMIT 1
    `);

    const nextQuestionPosition = queryResult.length === 0 ? null : queryResult[0]?.position;

    // if (!nextQuestionPosition) throw new ProtectedError({ userMessage: 'Cannot decrement question' });

    const prevCurrentQuestion = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            position: { equals: currentQuestionPosition },
        },
    });

    if (!prevCurrentQuestion) throw new ProtectedError({ userMessage: 'Could not find previous question.' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: nextQuestionPosition || '-1' },
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
    const position = parseInt(currentQuestionPosition || '-1');
    const queryResponse: EventQuestion[] = await prisma.$queryRawUnsafe(
        `
        SELECT * FROM "EventQuestion"
        WHERE "eventId" = $1::uuid
        AND position::BigInt > $2::BigInt
        ORDER BY position::BigInt ASC LIMIT 1
    `,
        eventId,
        position
    );

    const nextQuestion = queryResponse.length === 0 ? null : queryResponse[0];

    if (!nextQuestion) throw new ProtectedError({ userMessage: 'Cannot increment question' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: nextQuestion.position || '' },
        select: { currentQuestion: true, id: true },
    });

    return {
        event: updatedEvent,
        newCurrentQuestion: nextQuestion,
        prevCurrentQuestionPosition: currentQuestionPosition,
    };
}

export async function incrementOnDeck(userId: string, eventId: string, prisma: PrismaClient) {
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const _currentQuestionPosition = await getCurrentQuestionPosition(eventId, prisma);
    const currentQuestionPosition = parseInt(_currentQuestionPosition || '-1');
    const queryResponse: EventQuestion[] = await prisma.$queryRawUnsafe(
        `
        SELECT * FROM "EventQuestion"
        WHERE "eventId" = $1::uuid
        AND "onDeckPosition"::BigInt > $2::BigInt
        ORDER BY "onDeckPosition"::BigInt ASC LIMIT 1
    `,
        eventId,
        currentQuestionPosition
    );
    console.debug('Increment On Deck', queryResponse);

    const nextQuestion = queryResponse.length === 0 ? null : queryResponse[0];

    if (!nextQuestion) throw new ProtectedError({ userMessage: 'Cannot increment question' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: nextQuestion.onDeckPosition || '' },
        select: { currentQuestion: true, id: true },
    });

    return {
        event: updatedEvent,
        newCurrentQuestion: nextQuestion,
    };
}

export async function decrementOnDeck(userId: string, eventId: string, prisma: PrismaClient) {
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const _currentQuestionPosition = await getCurrentQuestionPosition(eventId, prisma);
    const currentQuestionPosition = parseInt(_currentQuestionPosition || '-1');
    const queryResponse: EventQuestion[] = await prisma.$queryRawUnsafe(
        `
        SELECT * FROM "EventQuestion"
        WHERE "eventId" = $1::uuid
        AND "onDeckPosition"::BigInt < $2::BigInt
        ORDER BY "onDeckPosition"::BigInt DESC LIMIT 1
    `,
        eventId,
        currentQuestionPosition
    );

    const nextQuestion = queryResponse.length === 0 ? null : queryResponse[0];

    if (!nextQuestion) throw new ProtectedError({ userMessage: 'Cannot increment question' });

    const prevCurrentQuestion = await prisma.eventQuestion.findFirst({
        where: {
            eventId,
            onDeckPosition: { equals: _currentQuestionPosition },
        },
    });

    if (!prevCurrentQuestion) throw new ProtectedError({ userMessage: 'Could not find previous question.' });

    const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { currentQuestion: nextQuestion.onDeckPosition || '' },
        select: { currentQuestion: true, id: true },
    });

    return {
        event: updatedEvent,
        newCurrentQuestion: nextQuestion,
        prevCurrentQuestion,
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

export async function addQuestionToTopicQueue(userId: string, prisma: PrismaClient, input: AddQuestionToTopicQueue) {
    const { eventId, topic, questionId } = input;
    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const currentTimeMs = new Date().getTime();
    const currentTimeMsStr = currentTimeMs.toString();

    const calculatedPosition = parseInt(currentTimeMsStr);

    // Check if already in queue or on deck
    if (topic === '' || topic === 'default') {
        const question = await prisma.eventQuestion.findFirst({
            where: { id: questionId, position: '-1', onDeckPosition: '-1' },
        });
        // if the question isn't found with the -1 position, then it's already in queue
        if (!question) throw new ProtectedError({ userMessage: 'Question is already in queue or on deck.' });
    } else {
        const question = await prisma.eventQuestionTopic.findFirst({
            where: { questionId: questionId, topic: { topic: topic } },
        });
        // if the question isn't found with the -1 position, then it's already in queue
        if (!question) throw new ProtectedError({ userMessage: `Question is already in the topic queue ${topic}.` });
    }

    // check if id is already non-negative
    const question = await prisma.eventQuestion.findFirst({ where: { id: questionId, position: '-1' } });
    // if the question isn't found with the -1 position, then it's already in queue
    if (!question) throw new ProtectedError({ userMessage: 'Question is already in queue.' });

    if (topic === '' || topic === 'default') {
        const reult = await prisma.eventQuestion.update({
            where: { id: questionId },
            data: {
                position: calculatedPosition.toString(),
            },
        });
        console.debug('Added to default queue', reult);
        return reult;
    }
    // Get the topic if it exists
    const topicResult = await prisma.eventTopic.findUnique({ where: { eventId_topic: { eventId, topic } } });
    if (!topicResult)
        throw new ProtectedError({
            userMessage: 'Topic does not exist.',
            internalMessage: `Topic ${topic} does not exist for event ${eventId}.`,
        });
    const result = await prisma.eventQuestionTopic.update({
        where: { questionId_topicId: { questionId, topicId: topicResult.id } },
        data: {
            position: calculatedPosition.toString(),
        },
        select: { question: true },
    });
    return result.question;
}

export async function removeQuestionFromTopicQueue(
    userId: string,
    prisma: PrismaClient,
    input: RemoveQuestionFromTopicQueue
) {
    const { eventId, questionId, topic } = input;
    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const toBeRemoved = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
    });
    if (!toBeRemoved) throw new ProtectedError({ userMessage: 'Question cannot be found.' });

    if (topic === '' || topic === 'default') {
        // Set the position to -1 to remove it from the default queue
        return prisma.eventQuestion.update({
            where: { id: questionId },
            data: {
                position: '-1',
            },
        });
    }
    // Remove from topic queue
    const eventTopic = await prisma.eventTopic.findUnique({ where: { eventId_topic: { eventId, topic } } });
    if (!eventTopic)
        throw new ProtectedError({
            userMessage: 'Topic not found.',
            internalMessage: `Topic ${topic} cannot be found on event ${eventId}.`,
        });
    const result = await prisma.eventQuestionTopic.update({
        where: { questionId_topicId: { questionId, topicId: eventTopic.id } },
        data: {
            position: '-1',
        },
        select: { question: true },
    });
    return result.question;
}

export async function addQuestionToOnDeck(userId: string, prisma: PrismaClient, input: AddQuestionToOnDeck) {
    // permission check
    const hasPermission = await isModerator(userId, input.eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    // check if already on deck
    const question = await prisma.eventQuestion.findFirst({ where: { id: input.questionId, onDeckPosition: '-1' } });
    if (!question) throw new ProtectedError({ userMessage: 'Question is already on deck.' });

    // Update all topic positions to -1 and position to -1 (as no question should be in a queue and on deck at the same time)
    return prisma.eventQuestion.update({
        where: { id: input.questionId },
        data: {
            position: '-1',
            onDeckPosition: input.newPosition,
            topics: {
                updateMany: {
                    where: { questionId: input.questionId },
                    data: { position: '-1' },
                },
            },
        },
    });
}

export async function removeQuestionFromOnDeck(userId: string, prisma: PrismaClient, input: RemoveQuestionFromOnDeck) {
    const { eventId, questionId, topic, newPosition } = input;
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
    if (event.currentQuestion >= toBeRemoved.onDeckPosition) {
        throw new ProtectedError({
            userMessage: 'Cannot remove question that has already been asked.',
            internalMessage: `Cannot remove question that has already been asked. Current question position: ${event.currentQuestion} | Question being dequeud position: ${toBeRemoved.position}`,
        });
    }

    if (topic === '' || topic === 'default') {
        // Set the position to -1 to remove it from the queue
        return prisma.eventQuestion.update({
            where: { id: questionId },
            data: {
                onDeckPosition: '-1',
                position: newPosition,
            },
        });
    }
    // Get topic id
    const topicResult = await prisma.eventTopic.findUnique({ where: { eventId_topic: { eventId, topic } } });
    if (!topicResult)
        throw new ProtectedError({
            userMessage: 'Topic not found.',
            internalMessage: `Topic ${topic} cannot be found on event ${eventId}.`,
        });

    // Reset on deck position
    await prisma.eventQuestion.update({
        where: { id: questionId },
        data: {
            onDeckPosition: '-1',
        },
    });
    // Set the position to new position in topic queue
    const result = await prisma.eventQuestionTopic.update({
        where: { questionId_topicId: { questionId, topicId: topicResult.id } },
        data: {
            position: newPosition,
        },
        select: { question: true },
    });
    return result.question;
}

export async function addQuestionToQueue(userId: string, prisma: PrismaClient, input: AddQuestionToQueue) {
    // permission check
    const hasPermission = await isModerator(userId, input.eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    const currentTimeMs = new Date().getTime();
    const currentTimeMsStr = currentTimeMs.toString();

    const calculatedPosition = parseInt(currentTimeMsStr);

    // check if id is already non-negative
    const question = await prisma.eventQuestion.findFirst({ where: { id: input.questionId, position: '-1' } });
    // if the question isn't found with the -1 position, then it's already in queue
    if (!question) throw new ProtectedError({ userMessage: 'Question is already in queue.' });

    return prisma.eventQuestion.update({
        where: { id: input.questionId },
        data: {
            position: calculatedPosition.toString(),
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
            position: '-1',
        },
    });
}

export async function findUserIdByEmail(email: string, prisma: PrismaClient) {
    return prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
    });
}

export async function updateOnDeckPosition(
    userId: string,
    prisma: PrismaClient,
    input: { eventId: string; questionId: string; newPosition: string }
) {
    const { eventId, questionId, newPosition } = input;
    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    return prisma.eventQuestion.update({
        where: { id: questionId },
        data: {
            onDeckPosition: newPosition,
        },
    });
}

export async function updateTopicQueuePosition(userId: string, prisma: PrismaClient, input: UpdateTopicQueuePosition) {
    const { eventId, questionId, newPosition, topic } = input;
    // permission check
    const hasPermission = await isModerator(userId, eventId, prisma);
    if (!hasPermission) throw new ProtectedError({ userMessage: errors.permissions });

    // Check if the question is in the default queue and update the position if so
    if (topic === '' || topic === 'default') {
        return prisma.eventQuestion.update({
            where: { id: questionId },
            data: {
                position: newPosition,
            },
        });
    }

    // Find topic id and update the topic queue position
    const topicQueryResult = await prisma.eventTopic.findUnique({
        where: { eventId_topic: { eventId, topic } },
        select: { id: true },
    });

    if (!topicQueryResult)
        throw new ProtectedError({
            userMessage: 'Topic not found.',
            internalMessage: `Topic ${topic} cannot be found on event ${eventId}.`,
        });
    const { id: topicId } = topicQueryResult;

    const updateResult = await prisma.eventQuestionTopic.update({
        where: { questionId_topicId: { questionId, topicId } },
        data: {
            position: newPosition,
        },
        select: { question: true },
    });
    return updateResult.question;
}

export function getTopicPosition(question: EventQuestion, topic: string) {
    const topicPosition = question?.topics?.find((t) => t.topic === topic)?.position;
    if (!topicPosition) return parseInt(question.position);
    return parseInt(topicPosition);
}

export function updateEventType(eventId: string, eventType: EventType, prisma: PrismaClient) {
    return prisma.event.update({
        where: { id: eventId },
        data: { eventType },
    });
}
