/* eslint-disable import/prefer-default-export */
import { search as utilSearch, FilterFunc } from 'utils/filters';
import { Question } from '../types';

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
    asked: QuestionFilterFunc;
}

export const filters: Filters = {
    asked: (questions) => questions.filter((q) => q.asked),
};
