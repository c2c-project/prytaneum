import React from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import useSnack from 'hooks/useSnack';

import FixtureContext from 'mock/Fixtures';
import useErrorHandler from '../useErrorHandler';

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
    const { meta, data } = React.useContext(FixtureContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const [handleError] = useErrorHandler();
    const sendRequest = React.useCallback(() => setIsLoading(true), []);
    const [snack] = useSnack();

    React.useEffect(() => {
        let isMounted = true;
        let isClosed = false;
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
            console.log('request');
            try {
                if (isClosed === false) {
                    await minWaitTime();
                }
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
            } catch (e) {
                if (isMounted === true) {
                    setIsLoading(false);
                    _onFailure(e);
                }
            }
        };

        const undoableRequest = () => {
            console.log('undoable request');
            let isStopped = false;
            let sentRequest = false;

            //{isClosed = true; void request();}
            const closeFunction = () => {
                console.log('close function');
                isClosed = true;
                if (sentRequest === false) {
                    sentRequest = true;
                    console.log('sentrequest=true in closefunction');
                    // eslint-disable-next-line no-void
                    void request();
                }
            };
            // eslint-disable-next-line no-void
            window.addEventListener('beforeunload', closeFunction, false);
            snack('Registered, Undo -> ', 'info', {
                action: React.createElement( 
                    Button,
                    {
                        onClick: () => {
                            if (isMounted === true) {
                                _onUndo();
                                isStopped = true;
                                // eslint-disable-next-line no-void
                                window.removeEventListener('beforeunload', closeFunction, false);
                            }
                        },
                        variant: 'text',
                        color: 'secondary'
                    },
                    'Undo'
                ),
                onExited: () => {
                    console.log('exited snack');
                    if (isStopped === false && sentRequest === false) {
                        sentRequest = true;
                        // eslint-disable-next-line no-void
                        void request();
                        console.log('exited snack and request sent');
                        // eslint-disable-next-line no-void
                        window.removeEventListener('beforeunload', closeFunction, false);
                    }
                }
            });            
        };

        if (isLoading) {
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
    }, [isLoading, endpoint, handleError, options, meta, data]);

    return [sendRequest, isLoading];
}

// request -> waiting -> response -> success or failure
