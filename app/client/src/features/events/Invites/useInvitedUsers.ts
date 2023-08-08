import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';

import { useInvitedUsersListFragment$key } from '@local/__generated__/useInvitedUsersListFragment.graphql';
import { useRefresh } from '@local/features/core';

export const USE_INVITED_USERS_LIST_FRAGMENT = graphql`
    fragment useInvitedUsersListFragment on Event
    @refetchable(queryName: "UseInvitedUsersListRefetchQuery")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String", defaultValue: "" }
        eventId: { type: "ID!" }
    ) {
        invited(first: $first, after: $after) {
            __id
            edges {
                node {
                    id
                    firstName
                    lastName
                    avatar
                    moderatorOf(eventId: $eventId)
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;

export type Invitee = {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string | null;
    readonly avatar: string | null;
    readonly moderatorOf: boolean;
};

interface Props {
    fragmentRef: useInvitedUsersListFragment$key;
    eventId: string;
}

export function useInvitedUsers({ fragmentRef, eventId }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_INVITED_USERS_LIST_FRAGMENT, fragmentRef);

    const REFRESH_INTERVAL = 15000; // 15 seconds
    const refresh = React.useCallback(() => {
        refetch({ eventId }, { fetchPolicy: 'store-and-network' });
    }, [refetch, eventId]);

    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    const invitedUsers = React.useMemo(() => {
        const invitees = data.invited?.edges?.map((invitee) => ({
            id: invitee?.node.id,
            firstName: invitee?.node.firstName,
            lastName: invitee?.node.lastName,
            avatar: invitee?.node.avatar,
            moderatorOf: invitee?.node.moderatorOf,
        })) as Invitee[];
        if (!invitees) return [];
        // Only return invitees that are not moderators (they are already in moderators list)
        return invitees.filter((invitee) => !invitee.moderatorOf);
    }, [data]);

    return { invitedUsers, refresh, connections: data.invited?.__id ? [data.invited.__id] : [] };
}
