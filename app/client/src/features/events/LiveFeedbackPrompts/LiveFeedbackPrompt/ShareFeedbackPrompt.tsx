import * as React from 'react';
import { Button, DialogContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMutation, graphql } from 'react-relay';

import type { ShareFeedbackPromptMutation } from '@local/__generated__/ShareFeedbackPromptMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { Prompt } from './LiveFeedbackPromptList';

interface Props {
    prompt: Prompt;
}

export const SHARE_FEEDBACK_PROMPT_MUTATION = graphql`
    mutation ShareFeedbackPromptMutation($promptId: ID!) {
        reshareFeedbackPrompt(promptId: $promptId) {
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

export function ShareFeedbackPrompt({ prompt }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<ShareFeedbackPromptMutation>(SHARE_FEEDBACK_PROMPT_MUTATION);

    function handleSubmit() {
        try {
            commit({
                variables: { promptId: prompt.id },
                onCompleted(payload) {
                    try {
                        if (payload.reshareFeedbackPrompt.isError)
                            throw new Error(payload.reshareFeedbackPrompt.message);
                        close();
                        displaySnack('Prompt re-shared successfully!', { variant: 'success' });
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
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>Are you sure you want to re-share this prompt?</Typography>
                    <Typography variant='subtitle2'>
                        NOTE: Only shares with participants that have not yet responded to the prompt.
                    </Typography>
                    <Typography variant='body1'>
                        <b>Prompt: {prompt.prompt}</b>
                    </Typography>
                    <Grid container justifyContent='end'>
                        <Button onClick={close}>Cancel</Button>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Share
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Tooltip title='Share Prompt' placement='top'>
                <IconButton onClick={open}>
                    <SendIcon />
                    <Typography variant='subtitle1'>Re-Share Prompt</Typography>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}
