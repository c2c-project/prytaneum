import useSnack from './useSnack';

export default function useErrorHandler() {
    const [snack] = useSnack();
    const handleError = (err: Error) => {
        snack(`Error: ${err.message}`);
    };
    // TODO: log this to server?
    return [handleError];
}
