import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'utils/axios';

import useSnack from 'hooks/useSnack';
import useEndpoint from 'hooks/useEndpoint';
import Component from './InfiniteScroll';

// Note: Get requests must have at the minimum two query parameters: page number and limit number.
// The response must contain a hasNext boolean attribute which will let know the client if there are more pages to fetch
function getNames(page: number, limit: number) {
    return axios.get<{ names: string[]; hasNext: boolean }>(
        `/api/mock/get-names?page=${page}&limit=${limit}`
    );
}

// Note: Example Scroll in a temp file because useEndpoint can not be called from a .stories file
export default function ExampleInfiniteScroll() {
    // Note: The following logic will have to be used in any component that wants to use InfiniteScroll
    /* ********************************************************************* */
    const [names, setNames] = React.useState<string[]>([]); // Names will be replaced with any data, depending on the use case
    const [hasNext, setHasNext] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [snack] = useSnack();
    const apiRequest = React.useCallback(() => getNames(page, 30), [page]);

    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: (results) => {
            // The conditional below can only be entered in the first request.
            // If the Initial request (page 1) has no data then we let the user know that there is no data.
            // The response must have a hasNext = false, so we know sendRequest will not be called by InfiniteScroll anymore
            if (results.data.names.length === 0) snack('No names were found');
            setNames((prev) => [...prev, ...results.data.names]);
            setHasNext(results.data.hasNext);
            setPage(page + 1);
        },
        onFailure: () => snack('Something went wrong, please try again!'),
    });
    /* ********************************************************************* */
    return (
        <Component
            loadMore={hasNext ? sendRequest : null}
            isLoading={isLoading}
        >
            <Button onClick={sendRequest}> Initial Request</Button>
            <div>
                {names.map((name, index) => (
                    <h1 key={index}>{name}</h1>
                ))}
            </div>
        </Component>
    );
}
