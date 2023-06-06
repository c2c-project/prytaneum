import React from 'react';
import { useRouter } from 'next/router';
import { graphql, useMutation } from 'react-relay';
import { Button, IconButton, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import type { ModeratorActionsStartEventMutation } from '@local/__generated__/ModeratorActionsStartEventMutation.graphql';
import type { ModeratorActionsEndEventMutation } from '@local/__generated__/ModeratorActionsEndEventMutation.graphql';
import { useSnack } from '@local/core';

export const START_EVENT_MUTATION = graphql`
    mutation ModeratorActionsStartEventMutation($eventId: String!) {
        startEvent(eventId: $eventId) {
            message
        }
    }
`;

export const END_EVENT_MUTATION = graphql`
    mutation ModeratorActionsEndEventMutation($eventId: String!) {
        endEvent(eventId: $eventId) {
            message
        }
    }
`;

export interface ModeratorActionsProps {
    isLive: Boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    eventId: string;
}

export function ModeratorActions({ isLive, setIsLive, eventId }: ModeratorActionsProps) {
    const theme = useTheme();
    const { displaySnack } = useSnack();
    const router = useRouter();

    const [commitEventEndMutation] = useMutation<ModeratorActionsStartEventMutation>(END_EVENT_MUTATION);
    const [commitEventStartMutation] = useMutation<ModeratorActionsEndEventMutation>(START_EVENT_MUTATION);

    const updateEventStatus = () => {
        if (isLive) {
            commitEventEndMutation({
                variables: {
                    eventId,
                },
                onCompleted() {
                    displaySnack('Event has ended!', { variant: 'error' });
                    setIsLive(false);
                },
            });
        } else {
            commitEventStartMutation({
                variables: {
                    eventId,
                },
                onCompleted() {
                    displaySnack('Event has started!', { variant: 'success' });
                    setIsLive(true);
                },
            });
        }
    };

    const handleRouting = () => {
        if (router.pathname === '/events/[id]/live') router.push(`/events/${eventId}/mod`);
        else router.push(`/events/${eventId}/live`);
    };

    return (
        <Grid item container justifyContent='center' alignContent='center' alignItems='center' width='100%' spacing={1}>
            <Grid item>
                <IconButton
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        ':hover': { backgroundColor: theme.palette.primary.dark },
                    }}
                    aria-label='moderator-view'
                    onClick={handleRouting}
                >
                    {router.pathname === '/events/[id]/live' ? (
                        <FullscreenIcon sx={{ color: 'white' }} />
                    ) : (
                        <FullscreenExitIcon sx={{ color: 'white' }} />
                    )}
                </IconButton>
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={() => console.log('TODO')}>
                    Intermission
                </Button>
            </Grid>
            <Grid item>
                <Button variant='contained' color={isLive ? 'error' : 'success'} onClick={updateEventStatus}>
                    {isLive ? 'End Event' : 'Start Event'}
                </Button>
            </Grid>
        </Grid>
    );
}
