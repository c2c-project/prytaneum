/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { add } from 'date-fns';

import { Townhall } from '../types';

export type HelperFunc = (data: Townhall[]) => Townhall[];

export function search(searchText: string, data: Townhall[]) {
    console.log(data);
    return data.filter(
        ({ form }) =>
            form.title.match(new RegExp(`.*${searchText}.*`, 'gi')) !== null
    );
}

// FIXME: probably gonna end up having a "completed" status on the Townhall

export interface Filters {
    [index: string]: HelperFunc;
    Upcoming: HelperFunc;
    Past: HelperFunc;
    Ongoing: HelperFunc;
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
