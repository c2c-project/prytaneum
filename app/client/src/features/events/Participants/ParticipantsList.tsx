import * as React from 'react';
import { fetchQuery, graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Button, DialogContent, Grid, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
// import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import type { ParticipantsListQuery } from '@local/__generated__/ParticipantsListQuery.graphql';
import { ConditionalRender, Loader, ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useEnvironment, useSnack } from '@local/core';
import { useMuteParticipant } from './useMuteParticipant';
import { useEvent } from '../useEvent';
import { useUnmuteParticipant } from './useUnmuteParticipant';
import { useParticipantMuted } from './useParticipantMuted';

// TODO Update to refetchable fragment w/ pagination
export const PARTICIPANTS_LIST_QUERY = graphql`
    query ParticipantsListQuery($eventId: ID!) {
        eventParticipants(eventId: $eventId) {
            user {
                id
                firstName
                lastName
                moderatorOf(eventId: $eventId)
            }
            isMuted
        }
    }
`;

type Participant = {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly moderatorOf: boolean;
    readonly isMuted: boolean;
};

interface ParticipantsListProps {
    queryRef: PreloadedQuery<ParticipantsListQuery>;
    isVisible: boolean;
    refresh: () => void;
}

export function ParticipantsList({ queryRef, isVisible, refresh }: ParticipantsListProps) {
    const { eventParticipants } = usePreloadedQuery(PARTICIPANTS_LIST_QUERY, queryRef);
    const [selectedParticipant, setSelectedParticipant] = React.useState<Participant | null>(null);
    const [isOpen, open, close] = useResponsiveDialog();
    const { muteParticipant } = useMuteParticipant();
    const { unmuteParticipant } = useUnmuteParticipant();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    // Refreshes the list when a participant is muted/unmuted
    useParticipantMuted(eventId, refresh);

    const participants = React.useMemo(() => {
        const unsortedParticipants = eventParticipants.map((p) => ({
            id: p?.user.id,
            firstName: p?.user.firstName,
            lastName: p?.user.lastName,
            moderatorOf: p?.user.moderatorOf,
            isMuted: p?.isMuted,
        })) as Participant[];
        // Sort by moderator status
        return unsortedParticipants.sort((a, b) => (a.moderatorOf === b.moderatorOf ? 0 : a.moderatorOf ? -1 : 1));
    }, [eventParticipants]);

    function handleToggleParticipantMute() {
        if (!selectedParticipant) return;
        try {
            if (!selectedParticipant.isMuted)
                muteParticipant({
                    variables: { eventId, userId: selectedParticipant.id },
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
                    variables: { eventId, userId: selectedParticipant.id },
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
        <Grid container display='grid' sx={{ visibility: isVisible ? 'visible' : 'hidden' }} height={0}>
            {participants.length === 0 && <p>No participants yet</p>}
            <List>
                {participants.map((participant) => (
                    <ListItem key={participant.id}>
                        <Paper style={{ width: '100%' }}>
                            <Grid container direction='row' alignItems='center' display='grid'>
                                <Grid item justifySelf='center' width='50px'>
                                    <img src='/static/participant_icon.svg' alt='avatar' width='50px' height='50px' />
                                </Grid>
                                <Grid item width='200px' gridColumn='2/5'>
                                    <Typography variant='body1'>
                                        {participant.firstName + ' ' + participant.lastName}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {participant.moderatorOf ? 'Moderator' : 'Participant'}
                                    </Typography>
                                </Grid>
                                <Grid item gridColumn='5/6' justifySelf='center' width='50px'>
                                    <ResponsiveDialog open={isOpen} onClose={close}>
                                        <DialogContent>
                                            <Typography variant='h6'>
                                                Are you sure you want to{' '}
                                                {selectedParticipant?.isMuted ? 'unmute ' : 'mute '}
                                                {`"${selectedParticipant?.firstName} ${selectedParticipant?.lastName}"`}{' '}
                                                for this event?
                                            </Typography>
                                            <Grid container justifyContent='end'>
                                                <Button onClick={close}>Cancel</Button>
                                                <Button variant='contained' onClick={handleToggleParticipantMute}>
                                                    {selectedParticipant?.isMuted ? 'unmute ' : 'mute '}
                                                </Button>
                                            </Grid>
                                        </DialogContent>
                                    </ResponsiveDialog>
                                    <IconButton
                                        disabled={participant.moderatorOf}
                                        onClick={() => {
                                            open();
                                            setSelectedParticipant(participant);
                                        }}
                                    >
                                        {participant.isMuted ? (
                                            <VolumeOffIcon color='error' />
                                        ) : (
                                            <VolumeUpIcon color='success' />
                                        )}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

interface PreloadedParticipantsListProps {
    eventId: string;
    isVisible: boolean;
}

export function PreloadedParticipantsList({ eventId, isVisible }: PreloadedParticipantsListProps) {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<ParticipantsListQuery>(PARTICIPANTS_LIST_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const responsesModalStatusRef = React.useRef<boolean>(false);
    const { env } = useEnvironment();
    const REFETCH_INTERVAL = 20000; // 20 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing || responsesModalStatusRef.current) return;
        setIsRefreshing(true);
        fetchQuery(env, PARTICIPANTS_LIST_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({ eventId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, eventId, isRefreshing, loadQuery]);

    React.useEffect(() => {
        if (!queryRef) refresh();
        const interval = setInterval(refresh, REFETCH_INTERVAL);
        return () => clearInterval(interval);
    }, [queryRef, loadQuery, eventId, refresh]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;

    return (
        <ConditionalRender client>
            <React.Suspense fallback={<ParticipantsList queryRef={queryRef} isVisible={isVisible} refresh={refresh} />}>
                <ParticipantsList queryRef={queryRef} isVisible={isVisible} refresh={refresh} />
            </React.Suspense>
        </ConditionalRender>
    );
}
