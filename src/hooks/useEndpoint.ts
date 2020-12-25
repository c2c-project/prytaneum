import React from 'react';
import { AxiosResponse } from 'axios';

import useIsMounted from './useIsMounted';
import useErrorHandler from './useErrorHandler';

type Endpoint<T> = () => Promise<AxiosResponse<T>>;
interface EndpointOptions<T> {
    onSuccess?: (value: AxiosResponse<T>) => void;
    onFailure?: (err: Error) => void;
    undo?: {
        message?: string;
        onClick: () => void;
    };
}

type SendRequest = () => void;
type IsLoading = boolean;
type EndpointUtils = [SendRequest, IsLoading];

async function wrapMinWaitTime<T>(endpoint: Endpoint<T>, time = 600) {
    const minWaitTime = () =>
        new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    const [results] = await Promise.allSettled([endpoint(), minWaitTime()]);
    if (results.status === 'rejected') throw new Error(results.reason);
    return results.value;
}

export default function useEndpoint<T>(
    endpoint: Endpoint<T>,
    options?: EndpointOptions<T>
): EndpointUtils {
    const [errorHandler] = useErrorHandler();
    const [isMounted] = useIsMounted();

    const [isLoading, setIsLoading] = React.useState(false);
    const start = React.useCallback(() => setIsLoading(true), [setIsLoading]);

    // calling this will invoke the request while waiting a minimum amount of time
    const wrappedEndpoint = React.useCallback(() => wrapMinWaitTime(endpoint), [
        endpoint,
    ]);

    // calls wrappedEndpoint and performs actions necessary depending on success or failure
    const sendRequest = React.useCallback(async () => {
        try {
            const results = await wrappedEndpoint();
            if (!isMounted) return;
            if (options?.onSuccess) options.onSuccess(results);
            setIsLoading(false);
        } catch (e) {
            if (!isMounted) return;
            if (options?.onFailure) options.onFailure(e);
            else errorHandler(e);
            setIsLoading(false);
        }
    }, [wrappedEndpoint, isMounted, options, setIsLoading]);

    // runs the async function
    const runAsync = React.useCallback(() => {
        // setting isLoading to true triggers the request
        // eslint-disable-next-line no-void
        if (isLoading) void sendRequest();
    }, [sendRequest, isLoading]);

    React.useEffect(runAsync, [runAsync]);

    return [start, isLoading];
}
