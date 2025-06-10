import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // You can use a different icon if more appropriate

interface Props {
    openPromptFlow: (flowId: string) => void; // Changed to openPromptFlow
    removePromptFlow: (flowId: string) => void; // Changed to removePromptFlow
}

export function useLiveFeedbackPromptFlowResponseSnack({ openPromptFlow, removePromptFlow }: Props) {
    // Changed hook name and props
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(
        (key: SnackbarKey, flowId: string) => {
            openPromptFlow(flowId);
            closeSnackbar(key);
        },
        [closeSnackbar, openPromptFlow]
    );

    const feedbackPromptFlowAction = useCallback(
        // Changed action name
        (key: SnackbarKey, flowId: string) => (
            <div>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onClick(key, flowId)}
                    startIcon={<QuestionAnswerIcon />} //  Keep or change icon
                >
                    Respond
                </Button>
                <Button
                    onClick={() => {
                        removePromptFlow(flowId);
                        closeSnackbar(key);
                    }}
                >
                    <Close />
                </Button>
            </div>
        ),
        [onClick, removePromptFlow, closeSnackbar]
    );

    const displaySnack = useCallback(
        (flowId: string, message: string, options?: OptionsObject) => {
            // Added flowId to args
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: (key) => options?.action || feedbackPromptFlowAction(key, flowId), // Use new action
                onExited: options?.onExited,
                color: 'inherit',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                persist: true,
            });
        },
        [enqueueSnackbar, feedbackPromptFlowAction]
    );
    return { displaySnack };
}
