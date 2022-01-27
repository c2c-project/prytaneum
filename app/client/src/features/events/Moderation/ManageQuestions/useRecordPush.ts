import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useRecordPushSubscription } from '@local/__generated__/useRecordPushSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';

export const RECORD_PUSH_CONFIG = graphql`
    subscription useRecordPushSubscription($eventId: ID!, $connections: [ID!]!) {
        recordPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
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

export function useRecordPush({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const recordPushConfig = React.useMemo<GraphQLSubscriptionConfig<useRecordPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
            },
            subscription: RECORD_PUSH_CONFIG,
        }),
        [eventId, connection]
    );
    useSubscription(recordPushConfig);
}
