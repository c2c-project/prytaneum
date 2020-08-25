import React from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import useSnack from 'hooks/useSnack';

import useErrorHandler from './useErrorHandler';

interface EndpointOptions<T> {
    onSuccess?: (value: AxiosResponse<T>) => void;
    onFailure?: (err: Error) => void;
    onUndo?: () => void;
    isUndo?: boolean;
}
type SendRequest = () => void;
type IsLoading = boolean;
type EndpointUtils = [SendRequest, IsLoading];

/**
 * @arg {Function} endpoint
 * @arg {Object} options
 * @arg {Function} options.onSuccess
 * @arg {Function} options.onFailure
 * @arg {Function} options.onUndo
 * @returns {Array}
 */
export default function useEndpoint<T>(
    endpoint: () => Promise<AxiosResponse<T>>,
    options: EndpointOptions<T> = {}
): EndpointUtils {
    const [isLoading, setIsLoading] = React.useState(false);
    const [handleError] = useErrorHandler();
    const sendRequest = React.useCallback(() => setIsLoading(true), []);
    const [snack] = useSnack();

    React.useEffect(() => {
        let isMounted = true;
        let isStopped = false;
        const { onSuccess, onFailure, onUndo, isUndo } = options;
        const minWaitTime = () =>
            new Promise((resolve) => {
                setTimeout(resolve, 600);
            });

        const defaultFailure = handleError;
        const defaultSucess = () => {};
        const defaultUndo = () => {};

        const _onSuccess = onSuccess || defaultSucess;
        const _onUndo = onUndo || defaultUndo;
        const _onFailure = (err: Error) => {
            defaultFailure(err);
            if (onFailure) {
                onFailure(err);
            }
        };

        const request = async function () {
            try {
                // the first indices is all I care about
                const [response] = await Promise.allSettled([
                    endpoint(),
                    minWaitTime(),
                ]);


                // I need to check if I'm still mounted before continuing
                if (isMounted === true) {
                    setIsLoading(false);
                    // there might be a better way to do this? other than just checking the status string :\
                    if (response.status === 'rejected') {
                        _onFailure(response.reason);
                    } else {
                        _onSuccess(response.value);
                    }
                }
            } catch (e) {
                /*
                 * check if I'm still mounted before continuing
                 * this catch only triggers if it is something on the client and not from the response
                 * because allSettled doesn't throw an error even if one of the promises are rejected
                 */
                if (isMounted === true) {
                    setIsLoading(false);
                    _onFailure(e);
                }
            }
        };

        const undoableRequest = () => {
            snack('Registered, Undo -> ', 'info', {
                action: React.createElement(
                    Button,
                    {
                        onClick: () => {
                            if (isMounted === true) {
                                isStopped = true;
                                _onUndo();
                                // eslint-disable-next-line no-void
                                window.removeEventListener('beforeunload', function (){void request();}, false);
                            }
                        },
                        variant: 'text',
                        color: 'secondary'
                    },
                    'Undo'
                ),
                onExited: () => {
                    if (isStopped === false) {
                        // eslint-disable-next-line no-void
                        void request();
                        // eslint-disable-next-line no-void
                        window.removeEventListener('beforeunload', function (){void request();}, false);
                    }
                }
            });            
        };

        // sendRequest sets loading to true, I use this as the trigger to send the request
        if (isLoading) {
            // I use callbacks after the request completes, so I don't care about "await"-ing the promise
            if (isUndo === true) {
                undoableRequest();
            } else { 
                // eslint-disable-next-line no-void
                void request();
            }
        }

        return () => {
            isMounted = false;
        };
    }, [isLoading, endpoint, handleError, options]);

    return [sendRequest, isLoading];
}

// request -> waiting -> response -> success or failure
