import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { Prompt } from '../LiveFeedbackPrompt/LiveFeedbackPromptList';
import Button from '@mui/material/Button';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { Grid, Typography, DialogContent } from '@mui/material';
import { useEvent } from '../../useEvent';
import { useSnack } from '@local/core';
import { LoadingButton } from '@local/components/LoadingButton';

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
    const { displaySnack } = useSnack();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        commit({
            variables: { eventId, promptId: prompt.id },
            onCompleted: () => {
                displaySnack('Successfully shared feedback prompt results.', { variant: 'success' });
                setIsLoading(false);
                close();
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                setIsLoading(false);
            },
        });
    };

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close} title='Share Results With Participants'>
                <DialogContent>
                    <Grid container>
                        <Grid container item justifyContent='center'>
                            <Typography>
                                Are you sure you would like to share the stats and summarized viewpoints?
                            </Typography>
                        </Grid>
                        <Grid container item justifyContent='center'>
                            <Button variant='outlined' onClick={close}>
                                Cancel
                            </Button>
                            <div style={{ width: '0.5rem' }} />
                            <LoadingButton loading={isLoading} variant='contained' onClick={handleSubmit}>
                                Share
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Grid item paddingBottom='1rem'>
                <Button variant='contained' color='primary' onClick={open}>
                    Share Results
                </Button>
            </Grid>
        </React.Fragment>
    );
}
