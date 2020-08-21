import useSnack from './useSnack';

export default function useErrorHandler() {
    const [snack] = useSnack();
    const handleError = (err: Error) => {
        snack(`Error: ${err.message}`, 'error');
    };
    // TODO: log this to server?
    return [handleError];
}
