import * as React from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';

export function useLiveFeedbackPromptResponseSnack(onClicK: () => void) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const feedbackPromptAction = React.useCallback(
        (key: SnackbarKey) => (
            <div>
                <Button onClick={onClicK} variant='text'>
                    Respond
                </Button>
                <Button
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    <Close />
                </Button>
            </div>
        ),
        [closeSnackbar, onClicK]
    );

    const makeSnack = React.useCallback(
        (message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: options?.action || feedbackPromptAction,
                onExited: options?.onExited,
                color: 'inherit',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        },
        [enqueueSnackbar, feedbackPromptAction]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
