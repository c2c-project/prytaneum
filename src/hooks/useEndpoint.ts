import React from 'react';
import { AxiosResponse } from 'axios';

import FixtureContext, { Fixture } from 'contexts/Fixtures';
import useErrorHandler from './useErrorHandler';

interface EndpointOptions<T> {
    onSuccess?: (value: AxiosResponse<T>) => void;
    onFailure?: (err: Error) => void;
}
type SendRequest = () => void;
type IsLoading = boolean;
type EndpointUtils = [SendRequest, IsLoading];

/**
 * @arg {Function} endpoint
 * @arg {Object} options
 * @arg {Function} options.onSuccess
 * @arg {Function} options.onFailure
 * @returns {Array}
 */
export default function useEndpoint<T>(
    endpoint: () => Promise<AxiosResponse<T>>,
    options: EndpointOptions<T> = {}
): EndpointUtils {
    const { meta, data } = React.useContext<Fixture<T>>(FixtureContext); // only used in dev mode
    const [isLoading, setIsLoading] = React.useState(false);
    const [handleError] = useErrorHandler();
    const sendRequest = React.useCallback(() => setIsLoading(true), []);

    React.useEffect(() => {
        let isMounted = true;
        const { onSuccess, onFailure } = options;
        const minWaitTime = () =>
            new Promise((resolve) => {
                setTimeout(resolve, 600);
            });

        const defaultFailure = handleError;
        const defaultSucess = () => {};

        const _onSuccess = onSuccess || defaultSucess;
        const _onFailure = (err: Error) => {
            defaultFailure(err);
            if (onFailure) {
                onFailure(err);
            }
        };

        const request = async function () {
            try {
                if (process.env.NODE_ENV === 'development') {
                    // instantly fetches data, figure out a way to mock loading? TODO:

                    await minWaitTime();
                    setIsLoading(false);
                    if (meta.status === 200) {
                        _onSuccess({
                            status: meta.status,
                            statusText: meta.statusText,
                            data,
                            headers: meta.headers,
                            config: meta.config,
                        } as AxiosResponse<T>);
                    } else {
                        throw new Error(meta.statusText);
                    }
                    return;
                }

                const [response] = await Promise.allSettled([
                    endpoint(),
                    minWaitTime(),
                ]);
                // check if I'm still mounted before continuing
                if (isMounted === true) {
                    setIsLoading(false);
                    // there might be a better way to do this?
                    if (response.status === 'rejected') {
                        _onFailure(response.reason);
                    } else {
                        _onSuccess(response.value);
                    }
                }
            } catch (e) {
                // check if I'm still mounted before continuing
                // this failure is something on the client and not from the response
                // because allSettled doesn't throw an error even if a promise is rejected
                if (isMounted === true) {
                    setIsLoading(false);
                    _onFailure(e);
                }
            }
        };

        if (isLoading) {
            // eslint-disable-next-line no-void
            void request();
        }

        return () => {
            isMounted = false;
        };
    }, [isLoading, endpoint, handleError, options, meta, data]);

    return [sendRequest, isLoading];
}

// request -> waiting -> response -> success or failure
