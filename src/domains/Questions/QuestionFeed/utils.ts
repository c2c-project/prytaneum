/* eslint-disable import/prefer-default-export */
import type {
    Question,
    Question as QuestionType,
    QuestionPayloads,
} from 'prytaneum-typings';
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

export function questionReducer(
    state: QuestionType[],
    action: QuestionPayloads
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
            return action.payload;
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
