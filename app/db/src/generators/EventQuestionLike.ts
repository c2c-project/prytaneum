import { EventQuestionLike } from '@app/prisma';

export const gen = (questionId: string, userId: string): EventQuestionLike => ({
    likedQuestion: '',
    likedBy: '',
});
