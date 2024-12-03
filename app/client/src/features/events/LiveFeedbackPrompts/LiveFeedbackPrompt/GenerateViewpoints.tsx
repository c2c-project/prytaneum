import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Typography, DialogContent, FormGroup, FormControlLabel, Checkbox, Tooltip, Stack } from '@mui/material';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useEvent } from '@local/features/events';
import { Prompt } from './LiveFeedbackPromptList';
import { useSnack } from '@local/core';
import { LoadingButton } from '@local/components/LoadingButton';

export const GENERATE_VIEWPOINTS_MUTATION = graphql`
    mutation GenerateViewpointsMutation($input: GenerateViewpointsInput!) {
        generateViewpoints(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    viewpoints
                    voteViewpoints
                }
            }
        }
    }
`;

interface Props {
    promptId: string;
    setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}

export default function GenerateViewpoints({ promptId, setSelectedPrompt }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation(GENERATE_VIEWPOINTS_MUTATION);
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [checked, setChecked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        commit({
            variables: {
                input: {
                    eventId,
                    promptId,
                    isForcedRegenerate: checked,
                },
            },
            onCompleted: () => {
                displaySnack('Successfully generated viewpoints.', { variant: 'success' });
                setIsLoading(false);
                close();
            },
            updater: (store) => {
                try {
                    const payload = store.getRootField('generateViewpoints');
                    if (!payload) throw new Error('No payload returned from generateViewpoints mutation');
                    const body = payload.getLinkedRecord('body');
                    if (!body) throw new Error('No body returned from generateViewpoints mutation');
                    const node = body.getLinkedRecord('node');
                    if (!node) throw new Error('No node returned from generateViewpoints mutation');
                    const viewpoints = node.getValue('viewpoints');
                    if (!viewpoints) throw new Error('No viewpoints returned from generateViewpoints mutation');
                    const voteViewpoints = node.getValue('voteViewpoints') as Record<string, string[]> | null;
                    if (!voteViewpoints) throw new Error('No voteViewpoints returned from generateViewpoints mutation');
                    const promptRecord = store.get(promptId);
                    if (!promptRecord) throw new Error('No prompt found in store');

                    promptRecord.setValue(viewpoints, 'viewpoints');
                    setSelectedPrompt((prev) => {
                        if (!prev) return prev;
                        return { ...prev, viewpoints: viewpoints as string[], voteViewpoints };
                    });
                } catch (error) {
                    console.error(error);
                    let errorMessage = 'Error generating viewpoints';
                    if (error instanceof Error) errorMessage += `: ${error.message}`;
                    displaySnack(errorMessage, { variant: 'error' });
                    setIsLoading(false);
                }
            },
            onError: (error) => {
                console.error(error);
                displaySnack(`Error generating viewpoints: ${error.message}`, { variant: 'error' });
                setIsLoading(false);
            },
        });
    };

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close} title='Generate Viewpoints'>
                <DialogContent>
                    <Grid container>
                        <Grid container item justifyContent='center'>
                            <Typography>Are you sure you would like to generate viewpoints?</Typography>
                        </Grid>
                        <Grid container item justifyContent='right'>
                            <FormGroup>
                                <Stack spacing={1} direction='row' alignItems='center'>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={handleChange} />}
                                        label='Force regenerate'
                                    />
                                    <Tooltip
                                        title="Forces regeneration of viewpoints when responses haven't changed. 
                                    By default viewpoints are cached until responses change. NOTE: This may overwrite any existing viewpoints."
                                        placement='top'
                                    >
                                        <InfoIcon sx={(theme) => ({ color: theme.palette.primary.main })} />
                                    </Tooltip>
                                </Stack>
                            </FormGroup>
                        </Grid>
                        <Grid container item justifyContent='center'>
                            <Button variant='outlined' onClick={close}>
                                Cancel
                            </Button>
                            <div style={{ width: '0.5rem' }} />
                            <LoadingButton loading={isLoading} variant='contained' onClick={handleSubmit}>
                                Generate
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Grid item paddingBottom='1rem'>
                <Button variant='contained' color='primary' onClick={open}>
                    Generate Viewpoints
                </Button>
            </Grid>
        </React.Fragment>
    );
}
