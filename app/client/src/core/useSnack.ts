import * as React from 'react';
import { useSnackbar } from 'notistack';

interface Options {
    action?: JSX.Element;
    onExited?: () => void;
}
import { useSnackbar, OptionsObject } from 'notistack';

export function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const makeSnack = React.useCallback(
        (message: string, options?: Options) => {
            enqueueSnackbar(message, {
                variant: 'default',
        (message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: options?.action,
                onExited: options?.onExited,
                color: 'inherit',
            });
        },
        [enqueueSnackbar]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
