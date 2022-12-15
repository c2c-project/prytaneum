import * as React from 'react';
import { Button, Typography, Grid, DialogContent } from '@mui/material';
import { PresentToAll as PresentToAllIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PreloadedLiveFeedbackPromptList } from './LiveFeedbackPrompt/LiveFeedbackPromptList';
import { ConditionalRender, Loader, StyledDialogTitle, StyledDialog } from '@local/components';

/**
 * A modal that opens when moderators click on the "Share Feedback Results" button
 * A list of previous feedback prompts are displayed, and moderators can click on each one to see the responses
 * A button can be pressed to share the results card for one of the prompts with the audience
 */
export function ShareFeedbackResults() {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={handleOpen} startIcon={<PresentToAllIcon />}>
                Share Feedback Results
            </Button>
            <StyledDialog
                fullScreen={fullscreen}
                maxWidth='lg'
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby='share-feedback-results-dialog'
            >
                <StyledDialogTitle id='share-feedback-results-dialog-title' onClose={handleClose}>
                    Share Feedback Results
                </StyledDialogTitle>
                <DialogContent dividers>
                    <Grid container direction='column' alignItems='center'>
                        <Typography variant='h6'>Select view on a prompt to see its responses</Typography>
                        <ConditionalRender client>
                            <React.Suspense fallback={<Loader />}>
                                <PreloadedLiveFeedbackPromptList />
                            </React.Suspense>
                        </ConditionalRender>
                    </Grid>
                </DialogContent>
            </StyledDialog>
        </React.Fragment>
    );
}
