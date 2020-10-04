/* eslint-disable import/prefer-default-export */
import { search as utilSearch, FilterFunc } from 'utils/filters';
import { Question, QuestionState } from '../types';

export { applyFilters } from 'utils/filters';

export type QuestionFilterFunc = FilterFunc<Question>;

export function search(searchText: string, data: Question[]) {
    const accessors = [
        (q: Question) => q.question,
        (q: Question) => q.meta.user.name,
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
    'In Queue': (questions) => questions.filter((q) => q.state === 'IN_QUEUE'),
    Asked: (questions) => questions.filter((q) => q.state === 'ASKED'),
    'Current Question': (questions) =>
        questions.filter((q) => q.state === 'CURRENT'),
};
