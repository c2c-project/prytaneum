import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useBroadcastMessageDeletedSubscription } from '@local/__generated__/useBroadcastMessageDeletedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_BROADCAST_MESSAGE_DELETED_SUBSCRIPTION = graphql`
    subscription useBroadcastMessageDeletedSubscription($eventId: ID!, $connections: [ID!]!) {
        broadcastMessageDeleted(eventId: $eventId) {
            edge {
                cursor
                node {
                    id @deleteEdge(connections: $connections)
                    position
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment
                }
            }
        }
    }
`;

export function useBroadcastMessageDeleted({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useBroadcastMessageDeletedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_BROADCAST_MESSAGE_DELETED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useBroadcastMessageDeletedSubscription>(createdConfig);
}
