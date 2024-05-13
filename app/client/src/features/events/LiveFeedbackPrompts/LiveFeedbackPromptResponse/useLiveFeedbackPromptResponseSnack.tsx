import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { SubmitLiveFeedbackPromptResponse } from '@local/features/events/LiveFeedbackPrompts/LiveFeedbackPromptResponse';
import { Prompt } from '../useLiveFeedbackPrompt';

export function useLiveFeedbackPromptResponseSnack(promptRef: React.MutableRefObject<Prompt>, eventId: string) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey) => (
            <div>
                <SubmitLiveFeedbackPromptResponse
                    eventId={eventId}
                    promptRef={promptRef}
                    closeSnackbar={() => closeSnackbar(key)}
                />
                <Button
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    <Close />
                </Button>
            </div>
        ),
        [closeSnackbar, promptRef, eventId]
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
