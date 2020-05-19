import React from 'react';
import API from '../contexts/API';
import useSnack from './useSnack';
import useErrorHandler from './useErrorHandler';

export default function useEndpoint(url, method = 'GET') {
    const _API = React.useContext(API);
    const [snack] = useSnack();
    const [handleError] = useErrorHandler();
    const request = new _API(url).method(method).onFailure((err) => {
        snack(
            'Trouble connecting to server, please try again in a few minutes',
            'error'
        );
        handleError(err);
    });
    return [request];
}
