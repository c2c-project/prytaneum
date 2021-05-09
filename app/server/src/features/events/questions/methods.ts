import { PrismaClient, EventQuestion } from '@app/prisma';
import { CreateQuestion, AlterLike } from '@local/graphql-types';
import { Maybe, errors } from '@local/features/utils';

type Input = Maybe<CreateQuestion> | undefined;
/**
 * submit a question, in the future this may plug into an event broker like kafka or redis
 */
export async function createQuestion(userId: Maybe<string>, prisma: PrismaClient, input: Input) {
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    const { question, refQuestion, isFollowUp, isQuote, eventId } = input;

    // it's okay to have both false, but both cannot be true
    if (isQuote === isFollowUp && isQuote === true) throw new Error(errors.invalidArgs);

    return prisma.eventQuestion.create({
        data: {
            eventId,
            question,
            refQuestionId: refQuestion || null,
            isFollowUp: isFollowUp || false,
            isQuote: isQuote || false,
            createdById: userId,
            position: 0, // TODO:
            isVisible: true,
            isAsked: false,
            lang: 'EN', // TODO:
        },
    });
}

/**
 * alters a like on a question question
 */
export async function alterLikeById(userId: Maybe<string>, prisma: PrismaClient, input: Maybe<AlterLike> | undefined) {
    // validation
    if (!userId) throw new Error(errors.noLogin);
    if (!input) throw new Error(errors.invalidArgs);

    // unpack and rename
    const { to: likeQuestion, id } = input;

    // helper functions
    const addLike = () => prisma.eventQuestionLike.create({ data: { likedBy: userId, likedQuestion: id } });
    const removeLike = () =>
        prisma.eventQuestionLike.delete({ where: { likedBy_likedQuestion: { likedBy: userId, likedQuestion: id } } });

    // perform the create or delete
    const results = likeQuestion ? await addLike() : await removeLike();

    // format results for graphql layer
    const formattedData = { user: { userId: results.likedBy }, question: { questionId: results.likedQuestion } };

    return formattedData;
}

/**
 * Filter function for event questions
 */
export function doesEventMatch(eventId: Maybe<string>, question: Partial<EventQuestion>) {
    return Boolean(eventId && eventId !== question.eventId);
}

/**
 * Find all questions relevant to the given event id
 */
export function questionsByEventId(eventId: Maybe<string>, prisma: PrismaClient) {
    if (!eventId) return null;
    return prisma.eventQuestion.findMany({ where: { eventId } });
}
