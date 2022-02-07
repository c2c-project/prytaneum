import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useRecordUnshiftSubscription } from '@local/__generated__/useRecordUnshiftSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const USE_RECORD_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useRecordUnshiftSubscription($eventId: ID!, $connections: [ID!]!) {
        recordUnshiftQuestion(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
                    position
                }
                cursor
            }
        }
    }
`;

export function useRecordUnshift({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const recordUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useRecordUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: USE_RECORD_UNSHIFT_SUBSCRIPTION,
        }),
        [connection, eventId]
    );
    useSubscription<useRecordUnshiftSubscription>(recordUnshiftConfig);
}
