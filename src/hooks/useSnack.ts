// import React from 'react';
import { useSnackbar } from 'notistack';

interface Options {
    action?: JSX.Element;
    onExited?: () => void;
}

/**
 *
 * @category hooks
 *
 */
export default function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return [
        (message: string, options?: Options) => {
            enqueueSnackbar(message, {
                variant: 'default',
                action: options?.action,
                onExited: options?.onExited,
                color: 'inherit',
            });
        },
        closeSnackbar,
    ];
}
