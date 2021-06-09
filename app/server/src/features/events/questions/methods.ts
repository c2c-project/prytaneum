import { PrismaClient } from '@app/prisma';
import { CreateQuestion, AlterLike } from '@local/graphql-types';
import { fromGlobalId } from 'graphql-relay';
import { errors } from '@local/features/utils';

/**
 * submit a question, in the future this may plug into an event broker like kafka or redis
 */
export async function createQuestion(userId: string, prisma: PrismaClient, input: CreateQuestion) {
    const { question, refQuestion: globalRefId, isFollowUp, isQuote, eventId } = input;
    const refQuestionId = globalRefId ? fromGlobalId(globalRefId).id : null;

    // it's okay to have both false, but both cannot be true
    if (isQuote === isFollowUp && isQuote === true) throw new Error(errors.invalidArgs);

    return prisma.eventQuestion.create({
        data: {
            eventId,
            question,
            refQuestionId,
            isFollowUp: isFollowUp || false,
            isQuote: isQuote || false,
            createdById: userId,
            isVisible: true,
            isAsked: false,
            lang: 'EN', // TODO:
        },
    });
}

/**
 * alters a like on a question question
 */
export async function alterLikeByQuestionId(userId: string, prisma: PrismaClient, input: AlterLike) {
    // unpack and rename
    const { to: likeQuestion, questionId } = input;

    // helper functions
    const addLike = () => prisma.eventQuestionLike.create({ data: { likedBy: userId, likedQuestion: questionId } });
    const removeLike = () =>
        prisma.eventQuestionLike.delete({
            where: { likedBy_likedQuestion: { likedBy: userId, likedQuestion: questionId } },
        });

    // perform the create or delete
    const results = likeQuestion ? await addLike() : await removeLike();

    if (results) return prisma.eventQuestion.findUnique({ where: { id: questionId } });
    return null;
}

/**
 * Filter function for event questions
 */
export async function doesEventMatch(eventId: string, questionId: string, prisma: PrismaClient) {
    // see if the event id matches the liked question
    const found = await prisma.eventQuestion.findFirst({
        where: { eventId, id: questionId },
        select: { id: true },
    });

    return Boolean(found);
}

/**
 * Find all questions relevant to the given event id
 */
export function findQuestionsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventQuestion.findMany({ where: { eventId } });
}

/**
 * find the submitter of a particular question
 */
export async function findSubmitterByQuestionId(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}

/**
 * find the referenced question
 */
export async function findRefQuestion(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        select: { refQuestion: true },
    });
    if (!queryResult || !queryResult.refQuestion) return null;
    return queryResult.refQuestion;
}

/**
 * find the number of likes
 */
export async function countLikes(questionId: string, prisma: PrismaClient) {
    return prisma.eventQuestionLike.count({ where: { likedQuestion: questionId } });
}

/**
 * find the users who liked the question
 */
export async function findLikedByUsers(questionId: string, prisma: PrismaClient) {
    const likeResults = await prisma.eventQuestionLike.findMany({
        where: { likedQuestion: questionId },
        select: { user: true },
    });

    // format results and return
    return likeResults.map(({ user }) => user);
}

/**
 * is the question liked by the current user
 */
export async function isLikedByViewer(userId: string, questionId: string, prisma: PrismaClient) {
    const result = await prisma.eventQuestionLike.findUnique({
        where: { likedBy_likedQuestion: { likedBy: userId, likedQuestion: questionId } },
    });
    return Boolean(result);
}

export async function isMyQuestion(userId: string, questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findFirst({
        where: { createdById: userId, id: questionId },
        select: { id: true },
    });
    return Boolean(queryResult);
}
