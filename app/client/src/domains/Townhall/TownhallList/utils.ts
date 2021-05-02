/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { add } from 'date-fns';
import type { Townhall } from 'prytaneum-typings';

import { search as utilSearch, FilterFunc } from 'utils/filters';

export { applyFilters } from 'utils/filters';

export type TonwhallFilterFunc = FilterFunc<Townhall>;

export function search(searchText: string, data: Townhall[]) {
    const accessor = (t: Townhall) => t.form.title;
    return utilSearch(searchText, data, [accessor]);
}

// FIXME: probably gonna end up having a "completed" status on the Townhall

export interface Filters {
    [index: string]: TonwhallFilterFunc;
    Upcoming: TonwhallFilterFunc;
    Past: TonwhallFilterFunc;
    Ongoing: TonwhallFilterFunc;
}

export const filters: Filters = {
    Upcoming: (data) =>
        data.filter(({ form }) => new Date(form.date).getTime() > Date.now()),
    Past: (data) =>
        data.filter(({ form }) => new Date(form.date).getTime() < Date.now()),
    Ongoing: (data) =>
        data.filter(
            ({ form }) =>
                new Date(form.date).getTime() > Date.now() &&
                add(new Date(form.date), { hours: 1.5 }).getTime() < Date.now()
        ),
};
