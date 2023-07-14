import * as React from 'react';
import { FragmentRefs, graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';

import type { ParticipantsListQuery } from '@local/__generated__/ParticipantsListQuery.graphql';
import { ConditionalRender, Loader } from '@local/components';
import { useEvent } from '../useEvent';
import { useParticipantMuted } from './useParticipantMuted';
// import ListFilter, { Accessors, useFilters } from '@local/components/ListFilter';
// import { ArrayElement } from '@local/utils/ts-utils';
import { ParticipantCard } from './ParticipantCard';
import { useParticipantList } from './useParticipantList';

// TODO Update to refetchable fragment w/ pagination
export const PARTICIPANTS_LIST_QUERY = graphql`
    query ParticipantsListQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                ...useParticipantListFragment @arguments(eventId: $eventId)
            }
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

type Node = {
    readonly id: string;
    readonly ' $fragmentSpreads': FragmentRefs<'useParticipantListFragment'>;
};

interface ParticipantsListProps {
    node: Node;
    isVisible: boolean;
}

export function ParticipantsList({ node, isVisible }: ParticipantsListProps) {
    const { eventId } = useEvent();
    const { participants, refresh } = useParticipantList({ fragmentRef: node, eventId });
    // Refreshes the list when a participant is muted/unmuted
    useParticipantMuted(eventId, refresh);

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
                                    <Grid item maxWidth='200px' minWidth='100px' gridColumn='2/5'>
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

interface ParticipantsListContainerProps {
    queryRef: PreloadedQuery<ParticipantsListQuery>;
    isVisible: boolean;
}

export function ParticipantsListContainer({ queryRef, isVisible }: ParticipantsListContainerProps) {
    const { node } = usePreloadedQuery(PARTICIPANTS_LIST_QUERY, queryRef);

    if (!node) return <Loader />;
    return <ParticipantsList node={node} isVisible={isVisible} />;
}

interface PreloadedParticipantsListProps {
    eventId: string;
    isVisible: boolean;
}

export function PreloadedParticipantsList({ eventId, isVisible }: PreloadedParticipantsListProps) {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<ParticipantsListQuery>(PARTICIPANTS_LIST_QUERY);

    React.useEffect(() => {
        loadQuery({ eventId });
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;

    return (
        <ConditionalRender client>
            <React.Suspense fallback={<ParticipantsListContainer queryRef={queryRef} isVisible={isVisible} />}>
                <ParticipantsListContainer queryRef={queryRef} isVisible={isVisible} />
            </React.Suspense>
        </ConditionalRender>
    );
}
