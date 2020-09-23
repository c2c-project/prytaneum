import React from 'react';
import axios from 'utils/axios';
import faker from 'faker';

// There is a problem using useEndpoint from stories?
import useEndpoint from 'hooks/useEndpoint';
import Component from './InfiniteScroll';

const createNames = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
        list.push(faker.name.firstName());
    }
    return list;
};

function getNames() {
    return axios.get<{ names: string[]; hasNext: boolean }>(
        '/api/mock/get-names'
    );
}

export default { title: 'Components/InfiniteScroll' };
export function ExampleScroll() {
    // const [state, setState] = React.useState(2000);
    const [names, setNames] = React.useState<string[]>(createNames(50));
    const [hasNext, setHasNext] = React.useState(true);

    const apiRequest = React.useCallback(() => getNames(), []);

    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: (results) => {
            console.log('Success');
            setNames((prev) => [...prev, ...results.data.names]);
            setHasNext(results.data.hasNext);
        },
        onFailure: () => console.log('Failure'),
    });

    // const addNames = () => {
    //     console.log('Waiting');
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         console.log('Finished waiting');
    //         setIsLoading(false);
    //         setNames((prev) => [...prev, ...createNames(30)]);
    //     }, 5000);
    // };
    return (
        <Component
            loadMore={hasNext ? sendRequest : null}
            isLoading={isLoading}
        >
            {names.map((name, index) => (
                <h1 key={index}>{name}</h1>
            ))}
            {/* <div style={{ height: `${state}px` }} /> */}
        </Component>
    );
}
