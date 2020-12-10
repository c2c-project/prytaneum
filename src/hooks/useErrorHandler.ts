import { AxiosError } from 'axios';

import useSnack from './useSnack';

function isAxiosError(error: Error): error is AxiosError<string> {
    return (error as AxiosError<string>).isAxiosError !== undefined;
}

export default function useErrorHandler() {
    const [snack] = useSnack();
    const handleError = <T extends Error>(err: T) => {
        if (isAxiosError(err)) {
            const message = err.response?.statusText || err.message;
            snack(`Error: ${message}`);
        } else {
            snack(`Error: ${err.message}`);
        }
    };
    // TODO: log this to server?
    return [handleError];
}
