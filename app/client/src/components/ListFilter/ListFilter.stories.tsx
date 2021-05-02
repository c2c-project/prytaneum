/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import faker from 'faker/locale/en';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { search as utilSearch, applyFilters, FilterFunc } from 'utils/filters';
import ListFilter, { Props } from './ListFilter';
import useFilters, { Accessors } from './useFilters';

export default {
    title: 'Components/List Filter',
    component: ListFilter,
    decorators: [
        (MyStory) => (
            <div style={{ height: '100%', padding: 60, flex: 1 }}>
                <MyStory />
            </div>
        ),
    ],
} as Meta;

const makeList = (num = 50) => {
    const result = [];
    for (let i = 0; i < num; i += 1) {
        result.push({
            _id: faker.random.alphaNumeric(10),
            title: faker.internet.userName(),
            subtitle: faker.company.bsAdjective(),
        });
    }
    return result;
};

type Datum = { _id: string; title: string; subtitle: string };
type Filter = FilterFunc<Datum>;

const filterMap: Record<string, Filter> = {
    // simple filters for demonstration purposes
    'Letter a': (data) => data.filter(({ title }) => title.toLowerCase().split('').includes('a')),
    'Letter b': (data) => data.filter(({ title }) => title.toLowerCase().split('').includes('b')),
    'Letter c': (data) => data.filter(({ title }) => title.toLowerCase().split('').includes('c')),
};

const search = (searchText: string, data: Datum[]) => {
    const titleAccessor = (d: Datum) => d.title;
    const subAccessor = (d: Datum) => d.subtitle;

    return utilSearch(searchText, data, [titleAccessor, subAccessor]);
};

// makes life easier and the type checking here isn't uber important
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoryProps = Props<any> & { children: React.ReactNode | React.ReactNodeArray };

const Template: Story<StoryProps> = ({ children, ...rest }) => (
    <>
        <ListFilter {...rest} />
        {children}
    </>
);

export const Empty = Template.bind({});
Empty.args = {
    length: 0,
    filterMap: undefined,
};
Empty.argTypes = {
    onSearch: { action: 'searching' },
    onFilterChange: { action: 'changing filter' },
};

export function WithoutHook() {
    // normally setData would be used to set the data after a fetch or something similar,
    // but we don't have that here since we initialize with the function
    // eslint-disable-next-line
    const [data, setData] = React.useState(makeList);
    const [filters, setFilters] = React.useState<Filter[]>([(list: Datum[]) => list]);

    // handle the search changing in the ListFilter component
    const handleSearch = React.useCallback(
        (text: string) =>
            // the first element is the previous search, which is what we are replacing
            // every other filter is the same
            setFilters(([, ...otherFilters]) => [(filteredList) => search(text, filteredList), ...otherFilters]),
        [setFilters]
    );

    // memoize the results with filters applied
    const filteredResults = React.useMemo(() => applyFilters(data || [], filters), [data, filters]);

    const handleFilterChange = (newFilters: Filter[]) => {
        // must maintain the current search filter since it is special and always takes up the first
        // index of the filter array
        setFilters(([searchFilter]) => [searchFilter, ...newFilters]);
    };

    return (
        <Template
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            length={filteredResults.length}
            filterMap={filterMap}
        >
            <List>
                {filteredResults.map(({ title, subtitle, _id }) => (
                    <ListItem key={_id}>
                        <ListItemText primary={title} secondary={subtitle} />
                    </ListItem>
                ))}
            </List>
        </Template>
    );
}

export function WithHook() {
    // eslint-disable-next-line
    const [data, setData] = React.useState(makeList);
    const accessors = React.useMemo<Accessors<Datum>[]>(() => [(d) => d.title, (d) => d.subtitle], []);
    const [filteredResults, handleSearch, handleFilterChange] = useFilters(data, accessors);

    return (
        <Template
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            length={filteredResults.length}
            filterMap={filterMap}
        >
            <List>
                {filteredResults.map(({ title, subtitle, _id }) => (
                    <ListItem key={_id}>
                        <ListItemText primary={title} secondary={subtitle} />
                    </ListItem>
                ))}
            </List>
        </Template>
    );
}

export { ListFilterSkeleton as Loading } from './ListFilter';
