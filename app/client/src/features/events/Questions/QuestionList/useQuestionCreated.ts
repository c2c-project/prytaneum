import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionCreatedSubscription } from '@local/__generated__/useQuestionCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';

export const USE_QUESTION_CREATED_SUBSCRIPTION = graphql`
    subscription useQuestionCreatedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionCreated(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    position
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useQuestionCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_QUESTION_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useQuestionCreatedSubscription>(createdConfig);
}
