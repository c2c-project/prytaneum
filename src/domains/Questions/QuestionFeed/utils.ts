/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/prefer-default-export */
import type {
    Question,
    Question as QuestionType,
    SocketIOEvents,
} from 'prytaneum-typings';
import { FilterFunc } from 'utils/filters';

export { applyFilters } from 'utils/filters';

export type QuestionFilterFunc = FilterFunc<Question>;

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

export function questionReducer(
    state: QuestionType[],
    action: SocketIOEvents['question-state'] | { type: 'flush'; payload: [] }
) {
    switch (action.type) {
        case 'create-question':
            return [action.payload, ...state];
        case 'update-question':
            return state.map((question) => {
                if (question._id === action.payload._id) {
                    return { ...question, ...action.payload };
                }
                return question;
            });
        case 'delete-question':
            return state.filter(
                (question) => question._id !== action.payload._id
            );
        case 'initial-state':
            return action.payload.reverse();
        case 'flush':
            return [];
        default:
            return state;
    }
}
