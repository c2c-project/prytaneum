import * as React from 'react';
import { fetchQuery, graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';

import type { ParticipantsListQuery } from '@local/__generated__/ParticipantsListQuery.graphql';
import { ConditionalRender, Loader } from '@local/components';
import { useEnvironment } from '@local/core';
import { useEvent } from '../useEvent';
import { useParticipantMuted } from './useParticipantMuted';
// import ListFilter, { Accessors, useFilters } from '@local/components/ListFilter';
// import { ArrayElement } from '@local/utils/ts-utils';
import { ParticipantCard } from './ParticipantCard';

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

export type Participant = {
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
    const { eventId } = useEvent();

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

    // const accessors = React.useMemo<Accessors<ArrayElement<Participant[]>>[]>(
    //     () => [(p) => p.firstName || '', (p) => p.lastName || ''],
    //     []
    // );

    // const [filteredList, handleSearch, handleFilterChange] = useFilters(participants, accessors);

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container display='grid' height={0} width='100%'>
            <Grid item paddingTop='1rem'>
                <Grid item container alignItems='center' justifyContent='center'>
                    <Typography variant='h6'>Participants List</Typography>
                </Grid>
                {participants.length === 0 && <p>No participants yet</p>}
                {/* <ListFilter
                    className={classes.listFilter}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    length={filteredList.length}
                /> */}
                <List>
                    {participants.map((participant) => (
                        <ListItem key={participant.id}>
                            <Paper style={{ width: '100%' }}>
                                <Grid container direction='row' alignItems='center' display='grid'>
                                    <Grid item justifySelf='center' width='50px'>
                                        <img
                                            src='/static/participant_icon.svg'
                                            alt='avatar'
                                            width='50px'
                                            height='50px'
                                        />
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
                                        <ParticipantCard participant={participant} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Grid>
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
        // For initial load, gives enough time for moderator to ping and show up in the list
        setTimeout(refresh, 500);
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
