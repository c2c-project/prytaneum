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

interface Props {
    open: boolean;
    handleClose: () => void;
    promptRef: React.MutableRefObject<Prompt | null>;
    selectedPrompt: Prompt | null;
    setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}

export default function FeedbackResponsesDialog({
    open,
    handleClose,
    promptRef,
    selectedPrompt,
    setSelectedPrompt,
}: Props) {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [voteKey, setVoteKey] = React.useState<string>('');

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

    const ShareFeedbackResultsButton = () => {
        if (selectedPrompt)
            return (
                <Grid item paddingBottom='1rem'>
                    <ShareFeedbackPromptResults prompt={selectedPrompt} />
                </Grid>
            );
        return <React.Fragment />;
    };

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
                            <GenerateViewpoints promptId={promptRef.current.id} setSelectedPrompt={setSelectedPrompt} />
                        ) : null}
                        <ShareFeedbackResultsButton />
                    </Stack>
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
                            {selectedPrompt?.voteViewpoints
                                ? Object.keys(selectedPrompt.voteViewpoints).map((viewpoint, index) => (
                                      <MenuItem key={index} value={viewpoint}>
                                          {viewpoint}
                                      </MenuItem>
                                  ))
                                : null}
                        </Select>
                    </FormControl>
                    {selectedPrompt ? <ViewpointsList prompt={selectedPrompt} vote={voteKey} /> : null}
                    {selectedPrompt ? (
                        <PreloadedLiveFeedbackPromptResponseList prompt={selectedPrompt} vote={voteKey} />
                    ) : null}
                </Grid>
            </DialogContent>
        </StyledDialog>
    );
}
