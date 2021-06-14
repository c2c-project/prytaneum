/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';

import { search as utilSearch, applyFilters, FilterFunc } from '@local/utils/filters';

export type Accessors<T> = (arg: T) => string;

export default function useFilters<Datum>(
    data: Datum[],
    accessors: Accessors<Datum>[]
): [Datum[], (searchText: string) => void, (filters: FilterFunc<Datum>[]) => void] {
    // list of filters with the default search as just returning the full amount of data
    const [filters, setFilters] = React.useState<FilterFunc<Datum>[]>([(list: Datum[]) => list]);

    // search function
    const search = React.useCallback(
        (searchText: string, searchData: Datum[]) => utilSearch(searchText, searchData, accessors),
        [accessors]
    );

    // memoized results of applying all active filters
    const filteredResults = React.useMemo(() => applyFilters(data || [], filters), [data, filters]);

    // handle search, always sets the first filter of the filter array
    const handleSearch = React.useCallback(
        (searchText: string) =>
            setFilters(([, ...otherFilters]) => [(filteredList) => search(searchText, filteredList), ...otherFilters]),
        [setFilters, search]
    );

    // replaces everythign but the first filter, b/c that is the search filter
    const handleFilterChange = React.useCallback(
        (newFilters: FilterFunc<Datum>[]) => {
            setFilters(([searchFilter]) => [searchFilter, ...newFilters]);
        },
        [setFilters]
    );

    return [filteredResults, handleSearch, handleFilterChange];
}
