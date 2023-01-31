import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { Prompt } from '../LiveFeedbackPrompt/LiveFeedbackPromptList';
import Button from '@mui/material/Button';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { Grid, Typography, DialogContent } from '@mui/material';
import { useEvent } from '../../useEvent';

export const SHARE_FEEDBACK_PROMPT_RESULTS_MUTATION = graphql`
    mutation ShareFeedbackPromptResultsMutation($eventId: ID!, $promptId: ID!) {
        shareFeedbackPromptResults(eventId: $eventId, promptId: $promptId) {
            isError
            message
            body {
                cursor
                node {
                    id
                    prompt
                }
            }
        }
    }
`;

interface ShareFeedbackResultsProps {
    prompt: Prompt;
}

export function ShareFeedbackPromptResults({ prompt }: ShareFeedbackResultsProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation(SHARE_FEEDBACK_PROMPT_RESULTS_MUTATION);
    const { eventId } = useEvent();

    const handleSubmit = () => {
        commit({
            variables: { eventId, promptId: prompt.id },
            onCompleted: close,
        });
    };

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close} title='Share Results With Participants'>
                <DialogContent>
                    <Grid container>
                        <Grid container item justifyContent='center'>
                            <Typography>Are you sure?</Typography>
                        </Grid>
                        <Grid container item justifyContent='center'>
                            <Button onClick={close}>Cancel</Button>
                            <Button onClick={handleSubmit}>Share</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Button variant='contained' color='primary' onClick={open}>
                Share Results
            </Button>
        </React.Fragment>
    );
}
