/* eslint-disable import/no-extraneous-dependencies -- IDE ESlint issue */
import * as React from 'react';
import type { MutableRefObject } from 'react';
import { DialogContent } from '@mui/material';
import { useMutation, graphql } from 'react-relay';

import type { SubmitLiveFeedbackPromptResponseMutation } from '@local/__generated__/SubmitLiveFeedbackPromptResponseMutation.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { LiveFeedbackPromptResponseForm, TLiveFeedbackPromptResponseFormState } from './LiveFeedbackPromptResponseForm';
import { Prompt } from '../useLiveFeedbackPrompt';
import { useSnack } from '@local/core';
import { FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH } from '@local/utils/rules';
import { isURL } from '@local/utils';

interface Props {
    eventId: string;
    promptRef: MutableRefObject<Prompt>;
    isOpen: boolean;
    open: () => void;
    close: () => void;
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

export function SubmitLiveFeedbackPromptResponse({ eventId, promptRef, isOpen, close }: Props) {
    const { displaySnack } = useSnack();
    const [commit] = useMutation<SubmitLiveFeedbackPromptResponseMutation>(
        SUBMIT_LIVE_FEEDBACK_PROMPT_RESPONSE_MUTATION
    );

    function handleSubmit(form: TLiveFeedbackPromptResponseFormState) {
        try {
            if (form.response.length > FEEDBACK_PROMPT_RESPONSE_MAX_LENGTH) throw new Error('Response is too long');
            if (isURL(form.response)) throw new Error('Response cannot be a URL');
            commit({
                variables: { input: { ...form, eventId } },
                onCompleted: (response) => {
                    try {
                        if (response.createFeedbackPromptResponse.isError)
                            throw new Error(response.createFeedbackPromptResponse.message);
                        displaySnack('Response submitted', { variant: 'success' });
                        close();
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen}>
                <DialogContent>
                    <LiveFeedbackPromptResponseForm
                        onCancel={() => {
                            close();
                        }}
                        onSubmit={handleSubmit}
                        // promptRef={promptRef}
                        prompt={promptRef.current}
                    />
                </DialogContent>
            </ResponsiveDialog>
        </React.Fragment>
    );
}
