import * as React from 'react';
import { Button, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useSnack } from '@local/core';
import { useMuteParticipant } from './useMuteParticipant';
import { useEvent } from '../useEvent';
import { useUnmuteParticipant } from './useUnmuteParticipant';
import { Participant } from './ParticipantsList';

export interface ParticipantCardProps {
    participant: Participant;
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { muteParticipant } = useMuteParticipant();
    const { unmuteParticipant } = useUnmuteParticipant();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    function handleToggleParticipantMute() {
        try {
            if (!participant.isMuted)
                muteParticipant({
                    variables: { eventId, userId: participant.id },
                    onCompleted(payload) {
                        try {
                            if (payload.muteParticipant.isError) throw new Error(payload.muteParticipant.message);
                            close();
                            displaySnack('Participant Muted', { variant: 'success' });
                        } catch (err) {
                            displaySnack(err.message, { variant: 'error' });
                        }
                    },
                });
            else
                unmuteParticipant({
                    variables: { eventId, userId: participant.id },
                    onCompleted(payload) {
                        try {
                            if (payload.unmuteParticipant.isError) throw new Error(payload.unmuteParticipant.message);
                            close();
                            displaySnack('Participant Unmuted', { variant: 'success' });
                        } catch (err) {
                            displaySnack(err.message, { variant: 'error' });
                        }
                    },
                });
        } catch (err) {
            console.error(err);
            displaySnack(err.message, { variant: 'error' });
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>
                        Are you sure you want to {participant?.isMuted ? 'unmute ' : 'mute '}
                        {`"${participant?.firstName} ${participant?.lastName}"`} for this event?
                    </Typography>
                    <Grid container justifyContent='end'>
                        <Button onClick={close}>Cancel</Button>
                        <Button variant='contained' onClick={handleToggleParticipantMute}>
                            {participant?.isMuted ? 'unmute ' : 'mute '}
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <IconButton disabled={participant.moderatorOf} onClick={open}>
                {participant.isMuted ? <VolumeOffIcon color='error' /> : <VolumeUpIcon color='success' />}
            </IconButton>
        </React.Fragment>
    );
}
