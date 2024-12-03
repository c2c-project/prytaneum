import * as React from 'react';
import { Button, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMutation, graphql } from 'react-relay';

import type { ShareFeedbackPromptDraftMutation } from '@local/__generated__/ShareFeedbackPromptDraftMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { Prompt } from './LiveFeedbackPromptList';

interface Props {
    prompt: Prompt;
}

export const SHARE_PROMPT_DRAFT_MUTATION = graphql`
    mutation ShareFeedbackPromptDraftMutation($promptId: ID!) {
        shareFeedbackPromptDraft(promptId: $promptId) {
            isError
            message
            body {
                cursor
                node {
                    id
                    isDraft
                }
            }
        }
    }
`;

export function ShareFeedbackPromptDraft({ prompt }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<ShareFeedbackPromptDraftMutation>(SHARE_PROMPT_DRAFT_MUTATION);

    function handleSubmit() {
        try {
            commit({
                variables: { promptId: prompt.id },
                onCompleted(payload) {
                    try {
                        if (payload.shareFeedbackPromptDraft.isError)
                            throw new Error(payload.shareFeedbackPromptDraft.message);
                        close();
                        displaySnack('Prompt submitted successfully!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
                updater(store) {
                    const promptRecord = store.get(prompt.id);
                    if (!promptRecord) return console.error('Prompt not found in store');
                    promptRecord.setValue(false, 'isDraft');
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>Are you sure you want to share this prompt?</Typography>
                    <Typography variant='body1'>Prompt: {prompt.prompt}</Typography>
                    <Grid container justifyContent='end'>
                        <Button onClick={close}>Cancel</Button>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Share
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <IconButton onClick={open}>
                <SendIcon />
                <Typography variant='subtitle1'>Share Draft</Typography>
            </IconButton>
        </React.Fragment>
    );
}
