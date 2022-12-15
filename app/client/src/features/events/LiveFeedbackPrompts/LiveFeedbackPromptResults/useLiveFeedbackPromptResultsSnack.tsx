import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { ViewLiveFeedbackPromptResults } from './ViewLiveFeedbackPromptResults';
import { Prompt } from './useLiveFeedbackPromptResultsShared';

export function useLiveFeedbackPromptResultsSnack(promptRef: React.MutableRefObject<Prompt>) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey) => (
            <div style={{ display: 'flex' }}>
                <div>
                    <ViewLiveFeedbackPromptResults promptRef={promptRef} closeSnack={() => closeSnackbar(key)} />
                </div>
                <div>
                    <Button
                        onClick={() => {
                            closeSnackbar(key);
                        }}
                    >
                        <Close />
                    </Button>
                </div>
            </div>
        ),
        [closeSnackbar, promptRef]
    );

    const makeSnack = useCallback(
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
                persist: true,
            });
        },
        [enqueueSnackbar, feedbackPromptAction]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
