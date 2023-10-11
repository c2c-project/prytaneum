import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';

import { useParticipantListFragment$key } from '@local/__generated__/useParticipantListFragment.graphql';
import { useRefresh } from '@local/features/core';

export const USE_PARTICIPANT_LIST_FRAGMENT = graphql`
    fragment useParticipantListFragment on Event
    @refetchable(queryName: "UseParticipantListRefetchQuery")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 100 }
        after: { type: "String", defaultValue: "" }
        eventId: { type: "ID!" }
    ) {
        participants(first: $first, after: $after) {
            edges {
                node {
                    user {
                        id
                        firstName
                        lastName
                        moderatorOf(eventId: $eventId)
                    }
                    isMuted
                }
            }
            pageInfo {
                hasNextPage
                endCursor
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

interface Props {
    fragmentRef: useParticipantListFragment$key;
    eventId: string;
}

export function useParticipantList({ fragmentRef, eventId }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_PARTICIPANT_LIST_FRAGMENT, fragmentRef);

    const REFRESH_INTERVAL = 15000; // 15 seconds
    const refresh = React.useCallback(() => {
        refetch({ eventId, first: 1000 }, { fetchPolicy: 'store-and-network' });
    }, [refetch, eventId]);

    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    const participants = React.useMemo(() => {
        const unsortedParticipants = data.participants?.edges?.map((participant) => ({
            id: participant?.node.user.id,
            firstName: participant?.node.user.firstName,
            lastName: participant?.node.user.lastName,
            moderatorOf: participant?.node.user.moderatorOf,
            isMuted: participant?.node.isMuted,
        })) as Participant[];
        if (!unsortedParticipants) return [];
        // Sort by moderator status
        return unsortedParticipants.sort((a, b) => (a.moderatorOf === b.moderatorOf ? 0 : a.moderatorOf ? -1 : 1));
    }, [data]);

    return { participants, refresh };
}
