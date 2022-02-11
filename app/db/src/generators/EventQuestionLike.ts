/* eslint-disable */
// FIXME: either delete this file or finish making a good database seed script
import { EventQuestionLike } from '@app/prisma';

export const gen = (questionId: string, userId: string): EventQuestionLike => ({
    likedQuestion: '',
    likedBy: '',
});
