import * as React from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';

export function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const dismissAction = React.useCallback(
        (key: SnackbarKey) => (
            <Button
                onClick={() => {
                    closeSnackbar(key);
                }}
                variant='text'
            >
                Dismiss
            </Button>
        ),
        [closeSnackbar]
    );

    const makeSnack = React.useCallback(
        (message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: options?.action || dismissAction,
                onExited: options?.onExited,
                color: 'inherit',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        },
        [dismissAction, enqueueSnackbar]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
