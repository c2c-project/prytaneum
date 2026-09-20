import * as React from 'react';
import {
    Typography,
    Grid,
    DialogContent,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PreloadedLiveFeedbackPromptResponseList } from '../LiveFeedbackPromptResponses/LiveFeedbackPromptResponseList';
import { ShareFeedbackPromptResults } from '../LiveFeedbackPromptResponses';
import { StyledDialogTitle, StyledDialog } from '@local/components';
import { Prompt } from './LiveFeedbackPromptList';
import ViewpointsList from './ViewpointsList';
import GenerateViewpoints from './GenerateViewpoints';
import { RunRound1Simulation, SimulationConfiguration } from './RunRound1Simulation';
import { hasRound1SimulationResponses } from './simulationEligibility';

interface Props {
    open: boolean;
    handleClose: () => void;
    promptRef: React.MutableRefObject<Prompt | null>;
    selectedPrompt: Prompt | null;
    setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
    simulationConfiguration: SimulationConfiguration;
    refresh: () => void;
}

export default function FeedbackResponsesDialog({
    open,
    handleClose,
    promptRef,
    selectedPrompt,
    setSelectedPrompt,
    simulationConfiguration,
    refresh,
}: Props) {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [voteKey, setVoteKey] = React.useState<string>('default');
    const [responseRefreshKey, setResponseRefreshKey] = React.useState(0);

    const handleSelectionChange = (e: SelectChangeEvent<string>) => {
        e.preventDefault();
        setVoteKey(e.target.value);
    };

    const PromptText = React.useCallback(() => {
        if (selectedPrompt)
            return (
                <Grid container padding='1rem'>
                    <Grid item xs>
                        <Typography variant='h5' style={{ overflowWrap: 'break-word' }}>
                            Prompt: {selectedPrompt.prompt}
                        </Typography>
                    </Grid>
                </Grid>
            );
        return <React.Fragment />;
    }, [selectedPrompt]);

    return (
        <StyledDialog
            fullScreen={fullscreen}
            maxWidth='lg'
            fullWidth={true}
            scroll='paper'
            open={open}
            onClose={handleClose}
            aria-labelledby='feedback-responses-dialog'
        >
            <StyledDialogTitle id='feedback-responses-dialog-title' onClose={handleClose}>
                Feedback Responses
            </StyledDialogTitle>
            <DialogContent dividers>
                <Grid container direction='column' alignItems='center' alignContent='center'>
                    <PromptText />
                    <Stack direction='row' spacing={2}>
                        {promptRef.current ? (
                            <React.Fragment>
                                <GenerateViewpoints
                                    promptId={promptRef.current.id}
                                    setSelectedPrompt={setSelectedPrompt}
                                    generateOnLoad={true}
                                />
                                <ShareFeedbackPromptResults prompt={promptRef.current} />
                                <RunRound1Simulation
                                    prompt={promptRef.current}
                                    isSurveyDraft={Boolean(promptRef.current.isDraft)}
                                    hasResponses={hasRound1SimulationResponses(promptRef.current)}
                                    configuration={simulationConfiguration}
                                    onSuccess={() => {
                                        setResponseRefreshKey((key) => key + 1);
                                        refresh();
                                    }}
                                />
                            </React.Fragment>
                        ) : null}
                    </Stack>
                    {!selectedPrompt?.isOpenEnded ? (
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id='lang-label'>Vote</InputLabel>
                            <Select
                                labelId='vote-select-label'
                                id='vote-select'
                                label='Vote'
                                name='vote'
                                value={voteKey}
                                onChange={handleSelectionChange}
                            >
                                <MenuItem value='default'>default</MenuItem>
                                {selectedPrompt?.voteViewpoints ? (
                                    Object.keys(selectedPrompt.voteViewpoints).map((viewpoint, index) => (
                                        <MenuItem key={index} value={viewpoint}>
                                            {viewpoint}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <React.Fragment />
                                )}
                            </Select>
                        </FormControl>
                    ) : (
                        <React.Fragment />
                    )}
                    {selectedPrompt ? <ViewpointsList prompt={selectedPrompt} vote={voteKey} /> : null}
                    {selectedPrompt ? (
                        <PreloadedLiveFeedbackPromptResponseList
                            key={`${selectedPrompt.id}-${responseRefreshKey}`}
                            prompt={selectedPrompt}
                            vote={voteKey}
                        />
                    ) : null}
                </Grid>
            </DialogContent>
        </StyledDialog>
    );
}
