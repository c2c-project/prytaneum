import React from 'react';
import useSnack from './useSnack';
import useErrorHandler from './useErrorHandler';

// export default function useEndpoint(url, method = 'GET') {
//     const _API = React.useContext(API);
//     const [isLoading, setLoading] = React.useState(false);
//     const [snack] = useSnack();
//     const [handleError] = useErrorHandler();
//     const request = new _API(url)
//         .method(method)
//         .onFailure((err) => {
//             snack(
//                 'Trouble connecting to server, please try again in a few minutes',
//                 'error'
//             );
//             handleError(err);
//         })
//         .onSuccess(() => setLoading(false));
//     return [request, isLoading];
// }

export default function useEndpoint(endpoint) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [responseState, setResponseState] = React.useState(null);
    const [handleError] = useErrorHandler();
    const [snack] = useSnack();

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
                    // there might be a better way to do this?
                    if (response.status === 'rejected') {
                        throw response.reason;
                    }
                    setIsLoading(false);
                    setResponseState(response.value);
                }
            } catch (e) {
                // check if I'm still mounted before continuing
                if (isMounted === true) {
                    setIsLoading(false);
                    snack(e.message, 'error');
                    handleError(e);
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

    return [() => setIsLoading(true), isLoading, responseState];
}
