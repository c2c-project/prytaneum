/* eslint-disable @typescript-eslint/prefer-regexp-exec */

export type FilterFunc<T> = (data: T[]) => T[];

export function search<T>(
    searchText: string,
    data: T[],
    accessors: ((s: T) => string)[]
) {
    return data.filter((datum) =>
        accessors
            .map((accessor) =>
                accessor(datum).match(new RegExp(`.*${searchText}.*`, 'gi'))
            )
            .some((result) => result !== null)
    );
}

export function applyFilters<T>(list: T[], filters: ((t: T[]) => T[])[]) {
    let filteredArr = [...(list || [])];
    for (let i = 0; i < filters.length; i += 1) {
        filteredArr = filters[i](filteredArr);
    }
    return filteredArr;
}
