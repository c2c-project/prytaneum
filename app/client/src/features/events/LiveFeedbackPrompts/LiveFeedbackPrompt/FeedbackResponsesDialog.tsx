import * as React from 'react';
import { Typography, Grid, DialogContent, Stack } from '@mui/material';
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

    const PromptText = React.useCallback(() => {
        if (promptRef.current)
            return (
                <Grid container padding='1rem'>
                    <Grid item xs>
                        <Typography variant='h5' style={{ overflowWrap: 'break-word' }}>
                            Prompt: {promptRef.current.prompt}
                        </Typography>
                    </Grid>
                </Grid>
            );
        return <React.Fragment />;
    }, [promptRef]);

    const ShareFeedbackResultsButton = () => {
        if (promptRef.current)
            return (
                <Grid item paddingBottom='1rem'>
                    <ShareFeedbackPromptResults prompt={promptRef.current} />
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
                    {selectedPrompt ? <ViewpointsList viewpoints={selectedPrompt.viewpoints} /> : null}
                    {promptRef.current ? <PreloadedLiveFeedbackPromptResponseList prompt={promptRef.current} /> : null}
                </Grid>
            </DialogContent>
        </StyledDialog>
    );
}
