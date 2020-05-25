import React from 'react';
import useErrorHandler from './useErrorHandler';

/**
 * @arg {Function} endpoint
 * @arg {Object} options
 * @arg {Function} options.onSuccess
 * @arg {Function} options.onFailure
 * @returns {Array}
 */
export default function useEndpoint(endpoint, options = {}) {
    const { onSuccess, onFailure } = options;
    const [isLoading, setIsLoading] = React.useState(false);
    const [handleError] = useErrorHandler();

    const defaultFailure = handleError;
    const defaultSucess = () => {};

    const _onSuccess = onSuccess || defaultSucess;
    const _onFailure = (err) => {
        defaultFailure(err);
        if (onFailure) {
            onFailure(err);
        }
    };

    const minWaitTime = () =>
        new Promise((resolve) => {
            setTimeout(resolve, 600);
        });

    React.useEffect(() => {
        let isMounted = true;
        const request = async function () {
            try {
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
            request();
        }

        return () => {
            isMounted = false;
        };
    }, [isLoading]);

    return [() => setIsLoading(true), isLoading];
}

// request -> waiting -> response -> success or failure
