import type { MutableRefObject } from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useMutation, graphql } from 'react-relay';

import type { SubmitLiveFeedbackPromptResponseMutation } from '@local/__generated__/SubmitLiveFeedbackPromptResponseMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LiveFeedbackPromptResponseForm, TLiveFeedbackPromptResponseFormState } from './LiveFeedbackPromptResponseForm';
import { Prompt } from '../useLiveFeedbackPrompt';

interface Props {
    eventId: string;
    promptRef: MutableRefObject<Prompt>;
    closeSnackbar: () => void;
}

export const SUBMIT_LIVE_FEEDBACK_PROMPT_RESPONSE_MUTATION = graphql`
    mutation SubmitLiveFeedbackPromptResponseMutation($input: CreateFeedbackPromptResponse!) {
        createFeedbackPromptResponse(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                }
            }
        }
    }
`;

export function SubmitLiveFeedbackPromptResponse({ eventId, promptRef, closeSnackbar }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation<SubmitLiveFeedbackPromptResponseMutation>(
        SUBMIT_LIVE_FEEDBACK_PROMPT_RESPONSE_MUTATION
    );

    function handleSubmit(form: TLiveFeedbackPromptResponseFormState) {
        commit({
            variables: { input: { ...form, eventId } },
            onCompleted: () => {
                closeSnackbar();
                close();
            },
        });
    }

    return (
        <>
            <ResponsiveDialog
                open={isOpen}
                onClose={() => {
                    closeSnackbar();
                    close();
                }}
            >
                <DialogContent>
                    <LiveFeedbackPromptResponseForm
                        onCancel={() => {
                            closeSnackbar();
                            close();
                        }}
                        onSubmit={handleSubmit}
                        promptRef={promptRef}
                    />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                variant='contained'
                color='primary'
                onClick={() => {
                    open();
                }}
                startIcon={<QuestionAnswerIcon />}
            >
                Respond
            </Button>
        </>
    );
}
