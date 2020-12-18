import qs from 'qs';
import type { QuestionForm, Question } from 'prytaneum-typings';

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
