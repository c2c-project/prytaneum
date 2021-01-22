import qs from 'qs';
import type { QuestionForm, Question, ReplyForm } from 'prytaneum-typings';

import axios from 'utils/axios';

/**
 * gets a specific question
 */
export async function getQuestion(townhallId: string, questionId: string) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}`;
    return axios.post(url);
}

/**
 * gets a list of questions
 */
export async function getQuestions(townhallId: string) {
    const url = `/api/townhalls/${townhallId}/questions`;
    return axios.get<Question[]>(url);
}

/**
 * creates a new question
 */
export async function createQuestion(townhallId: string, form: QuestionForm) {
    const url = `/api/townhalls/${townhallId}/questions`;
    return axios.post(url, qs.stringify(form));
}

/**
 * updates a question
 */
export async function updateQuestion(
    townhallId: string,
    form: QuestionForm,
    questionId: string
) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}`;
    return axios.put(url, qs.stringify(form));
}

/**
 * deletes a question
 */
export async function deleteQuestion(townhallId: string, questionId: string) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}`;
    return axios.delete(url);
}

/**
 * adds a user's like to a question
 */
export async function createLike(townhallId: string, questionId: string) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}/like`;
    return axios.put(url);
}

/**
 * deletes the current user's like from a question
 */
export async function deleteLike(townhallId: string, questionId: string) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}/like`;
    return axios.delete(url);
}

/**
 * creates a reply
 */
export async function createReply(
    townhallId: string,
    questionId: string,
    form: ReplyForm
) {
    const url = `/api/townhalls/${townhallId}/questions/${questionId}/reply`;
    return axios.post(url, qs.stringify(form));
}

/**
 * add to playlist
 */
export async function addToPlaylist(townhallId: string, questionId: string) {
    // FIXME:
    const url = `/api/townhalls/${townhallId}/playlist?${qs.stringify({
        questionId,
    })}`;
    return axios.post(url);
}

/**
 * deletes a question from the playlist
 */
export async function deleteFromPlaylist(
    townhallId: string,
    questionId: string
) {
    const url = `/api/townhalls/${townhallId}/playlist/${questionId}`;
    return axios.delete(url);
}

/**
 * add to queue
 */
export async function addToQueue(townhallId: string, questionId: string) {
    // FIXME:
    const url = `/api/townhalls/${townhallId}/playlist/queue?${qs.stringify({
        questionId,
    })}`;
    return axios.post(url);
}

export async function updateQueueOrder(
    townhallId: string,
    questions: Question[]
) {
    const url = `/api/townhalls/${townhallId}/playlist/queue`;
    return axios.put(url, { questions });
}

/**
 * deletes a question from queue
 */
export async function deleteFromQueue(townhallId: string, questionId: string) {
    const url = `/api/townhalls/${townhallId}/playlist/queue/${questionId}`;
    return axios.delete(url);
}

/**
 * goes to the next question
 */
export async function nextQuestion(townhallId: string) {
    const url = `/api/townhalls/${townhallId}/playlist/next`;
    return axios.post(url);
}

/**
 * goes to the next question
 */
export async function prevQuestion(townhallId: string) {
    const url = `/api/townhalls/${townhallId}/playlist/previous`;
    return axios.post(url);
}
