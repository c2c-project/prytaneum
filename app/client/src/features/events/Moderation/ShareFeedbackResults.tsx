import * as React from 'react';
import { Button, Modal, Box, Typography, Grid } from '@mui/material';
import { PresentToAll } from '@mui/icons-material';

import { PreloadedLiveFeedbackPromptList } from './LiveFeedbackPrompt/LiveFeedbackPromptList';
import { Loader } from '@local/components/Loader';

/**
 * A modal that opens when moderators click on the "Share Feedback Results" button
 * A list of previous feedback prompts are displayed, and moderators can click on each one to see the responses
 * A button can be pressed to share the results card for one of the prompts with the audience
 */
export function ShareFeedbackResults() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div id='share-feedback-results-container'>
            <Button variant='contained' color='primary' onClick={handleOpen} startIcon={<PresentToAll />}>
                Share Feedback Results
            </Button>
            <Modal
                open={open}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClose={handleClose}
                aria-labelledby='share-feedback-results-modal'
            >
                <Box
                    id='share-feedback-results-modal-box'
                    sx={{
                        width: '85vw',
                        height: '85vh',
                        maxWidth: '1280px',
                        maxHeight: '720px',
                        bgcolor: 'background.paper',
                        overflow: 'scroll',
                    }}
                >
                    <Grid container direction='column' alignItems='center' alignContent='center'>
                        <Typography className='modal-title' variant='h5' paddingTop='1.5rem'>
                            Share Feedback Results
                        </Typography>
                        <Typography className='modal-description' variant='body1' paddingTop='1rem'>
                            Select a feedback prompt to see the responses
                        </Typography>
                        <React.Suspense fallback={<Loader />}>
                            <PreloadedLiveFeedbackPromptList />
                        </React.Suspense>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
