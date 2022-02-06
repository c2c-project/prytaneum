import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionUpdatedSubscription } from '@local/__generated__/useQuestionUpdatedSubscription.graphql';
import { useEvent } from '../../useEvent';

export const USE_QUESTION_UPDATED_SUBSCRIPTION = graphql`
    subscription useQuestionUpdatedSubscription($eventId: ID!) {
        questionUpdated(eventId: $eventId) {
            edge {
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

export function useQuestionUpdated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionUpdatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_QUESTION_UPDATED_SUBSCRIPTION,
        }),
        [eventId, connections]
    );

    useSubscription<useQuestionUpdatedSubscription>(createdConfig);
}
