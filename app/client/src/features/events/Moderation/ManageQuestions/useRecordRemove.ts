import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useRecordRemoveSubscription } from '@local/__generated__/useRecordRemoveSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_RECORD_REMOVE_SUBSCRIPTION = graphql`
    subscription useRecordRemoveSubscription($eventId: ID!, $connections: [ID!]!) {
        recordRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

export function useRecordRemove({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const recordRemoveConfig = React.useMemo<GraphQLSubscriptionConfig<useRecordRemoveSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: USE_RECORD_REMOVE_SUBSCRIPTION,
        }),
        [eventId, connection]
    );
    useSubscription<useRecordRemoveSubscription>(recordRemoveConfig);
}
