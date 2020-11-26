/* eslint-disable import/prefer-default-export */
import type { Question, Question as QuestionType } from 'prytaneum-typings';
import { search as utilSearch, FilterFunc } from 'utils/filters';
import { QuestionProps } from '../QuestionFeedItem';

export { applyFilters } from 'utils/filters';

export type QuestionFilterFunc = FilterFunc<Question>;

export function search(searchText: string, data: Question[]) {
    const accessors = [
        (q: Question) => q.question,
        (q: Question) => q.meta.createdBy.name.first,
    ];
    return utilSearch(searchText, data, accessors);
}

export interface Filters {
    [index: string]: QuestionFilterFunc;
    'In Queue': QuestionFilterFunc;
    Asked: QuestionFilterFunc;
    'Current Question': QuestionFilterFunc;
}

export const filters: Filters = {
    'In Queue': (questions) => questions.filter((q) => q.state === 'in_queue'),
    Asked: (questions) => questions.filter((q) => q.state === 'asked'),
    'Current Question': (questions) =>
        questions.filter((q) => q.state === 'current'),
};

interface NewQuestionAction {
    type: 'new-question';
    payload: QuestionType;
}
interface UpdateQuestionAction {
    type: 'update-question';
    payload: Pick<QuestionType, 'question' | '_id'>;
}
interface DeleteQuestionAction {
    type: 'hide-question';
    payload: Pick<QuestionType, '_id'>;
}

export type Actions =
    | NewQuestionAction
    | UpdateQuestionAction
    | DeleteQuestionAction;

export function questionReducer(state: QuestionType[], action: Actions) {
    switch (action.type) {
        case 'new-question':
            return [action.payload, ...state];
        case 'update-question':
            return state.map((question) => {
                if (question._id === action.payload._id) {
                    return { ...question, ...action.payload };
                }
                return question;
            });
        case 'hide-question':
            return state.filter(
                (question) => question._id !== action.payload._id
            );
        default:
            return state;
    }
}

export function makeSystemMessage(message: React.ReactNode): QuestionProps {
    return {
        user: 'Prytaneum',
        timestamp: new Date(),
        children: message,
    };
}
