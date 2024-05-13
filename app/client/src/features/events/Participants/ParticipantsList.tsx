import * as React from 'react';
import { FragmentRefs, graphql } from 'relay-runtime';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, List, ListItem, Typography } from '@mui/material';

import type { ParticipantsListQuery } from '@local/__generated__/ParticipantsListQuery.graphql';
import { ConditionalRender, Loader } from '@local/components';
import { useEvent } from '../useEvent';
import { useParticipantMuted } from './useParticipantMuted';
import ListFilter, { Accessors, useFilters } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
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

    const accessors = React.useMemo<Accessors<ArrayElement<Participant[]>>[]>(
        () => [(p) => p.firstName || '', (p) => p.lastName || ''],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(participants, accessors);

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container display='grid' height={0} width='100%'>
            <Grid item container alignItems='center' justifyContent='center' paddingY='.5rem'>
                <Typography variant='h6'>Participants List</Typography>
            </Grid>
            {participants.length > 0 && (
                <ListFilter
                    style={{ flex: 1, marginLeft: '1rem', marginBottom: '-1rem' }}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    length={filteredList.length}
                />
            )}
            {participants.length === 0 && (
                <Grid item container justifyContent='center'>
                    <Typography variant='body1'>No participants found...</Typography>
                </Grid>
            )}
            <List>
                {filteredList.map((participant) => (
                    <ListItem key={participant.id}>
                        <ParticipantCard participant={participant} />
                    </ListItem>
                ))}
            </List>
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
