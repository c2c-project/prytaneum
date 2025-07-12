import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Grid, Typography, DialogContent, FormGroup, FormControlLabel, Checkbox, Tooltip, Stack } from '@mui/material';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useEvent } from '@local/features/events';
import { Prompt } from './LiveFeedbackPromptList';
import { useSnack } from '@local/core';
import { LoadingButton } from '@local/components/LoadingButton';
import { GenerateViewpointsMutation } from '../../../../__generated__/GenerateViewpointsMutation.graphql';

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
    updateViewpoints?: (viewpoints: string[], voteViewpoints: Record<string, string[]>) => void;
    generateOnLoad?: boolean; // Optional prop to trigger generation on load
}

export default function GenerateViewpoints({
    promptId,
    setSelectedPrompt,
    updateViewpoints,
    generateOnLoad = false,
}: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation<GenerateViewpointsMutation>(GENERATE_VIEWPOINTS_MUTATION);
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
            onCompleted: ({ generateViewpoints }, errors) => {
                if (generateViewpoints.isError) {
                    displaySnack(`Error generating viewpoints: ${generateViewpoints.message}`, { variant: 'error' });
                } else if (errors) {
                    displaySnack(`Error generating viewpoints: ${errors[0].message}`, { variant: 'error' });
                } else {
                    if (!generateOnLoad) displaySnack('Successfully generated viewpoints.', { variant: 'success' });
                }
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

                    promptRecord.setValue(viewpoints as string[], 'viewpoints');
                    setSelectedPrompt((prev) => {
                        if (!prev) return prev;
                        return { ...prev, viewpoints: viewpoints as string[], voteViewpoints };
                    });
                    if (updateViewpoints) {
                        updateViewpoints(viewpoints as string[], voteViewpoints);
                    }
                } catch (error) {
                    console.error(error);
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

    React.useEffect(() => {
        if (generateOnLoad) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const gradient = 'linear-gradient(to right bottom, #9c27b0, #2979ff)';

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
                            <LoadingButton
                                loading={isLoading}
                                variant='contained'
                                onClick={handleSubmit}
                                sx={{ backgroundImage: gradient }}
                            >
                                Generate
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Grid item paddingBottom='1rem'>
                <Button
                    variant='contained'
                    startIcon={<AutoAwesomeIcon />}
                    color='primary'
                    onClick={open}
                    sx={{ backgroundImage: gradient }}
                >
                    Generate Viewpoints
                </Button>
            </Grid>
        </React.Fragment>
    );
}
