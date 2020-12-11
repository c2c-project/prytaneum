import React from 'react';
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
    const makeSnack = React.useCallback(
        (message: string, options?: Options) => {
            enqueueSnackbar(message, {
                variant: 'default',
                action: options?.action,
                onExited: options?.onExited,
                color: 'inherit',
            });
        },
        [enqueueSnackbar]
    );
    return [makeSnack, closeSnackbar];
}
