import React from 'react';
import Component from './InfiniteScroll';
import faker from 'faker';

const createNames = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
        list.push(faker.name.firstName());
    }
    return list;
};

export default { title: 'Components/InfiniteScroll' };
export function ExampleScroll() {
    const [state, setState] = React.useState(2000);
    const [names, setNames] = React.useState<string[]>(createNames(50));
    const [isLoading, setIsLoading] = React.useState(false);
    // const [hasMore, setHasMore] = React.useState(true);

    // Work TODO: Add mock api and call useEndpoint here to get a sendRequest function
    const addNames = () => {
        console.log('Waiting');
        setIsLoading(true);
        setTimeout(() => {
            console.log('Finished waiting');
            setIsLoading(false);
            setNames((prev) => [...prev, ...createNames(30)]);
        }, 5000);
    };
    return (
        <Component loadMore={addNames} isLoading={isLoading}>
            {names.map((name, index) => (
                <h1 key={index}>{name}</h1>
            ))}
            {/* <div style={{ height: `${state}px` }} /> */}
        </Component>
    );
}
