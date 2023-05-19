import * as React from 'react';
import { Box, Button, Grid, Modal } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';

import { EventVideo } from './EventVideo';
import { EventVideoFragment$key } from '@local/__generated__/EventVideoFragment.graphql';

interface VideoModalProps {
    fragmentRef: EventVideoFragment$key;
}

export function VideoModal({ fragmentRef }: VideoModalProps) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button
                variant='contained'
                size='large'
                startIcon={<VideocamIcon fontSize='inherit' />}
                onClick={handleOpen}
            >
                Watch Replay
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='event-video-modal'
                aria-describedby='a modal containing the event video'
            >
                <Grid container justifyContent='center' alignContent='center'>
                    <Box sx={{ width: '80%', padding: '1rem', backgroundColor: 'white' }}>
                        <Grid item container justifyContent='flex-end' paddingBottom='1rem'>
                            <Button variant='text' color='inherit' onClick={handleClose}>
                                <CloseIcon />
                            </Button>
                        </Grid>
                        <Grid item container>
                            <EventVideo fragmentRef={fragmentRef} />
                        </Grid>
                    </Box>
                </Grid>
            </Modal>
        </React.Fragment>
    );
}
