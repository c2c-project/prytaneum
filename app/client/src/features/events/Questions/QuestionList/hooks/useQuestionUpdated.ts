import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionUpdatedSubscription } from '@local/__generated__/useQuestionUpdatedSubscription.graphql';
import { useEvent } from '../../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_QUESTION_UPDATED_SUBSCRIPTION = graphql`
    subscription useQuestionUpdatedSubscription($eventId: ID!, $lang: String!) {
        questionUpdated(eventId: $eventId) {
            edge {
                cursor
                node {
                    id
                    position
                    onDeckPosition
                    topics {
                        topic
                        position
                    }
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useQuestionUpdated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionUpdatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_QUESTION_UPDATED_SUBSCRIPTION,
        }),
        [eventId, connections, user?.preferredLang]
    );

    useSubscription<useQuestionUpdatedSubscription>(createdConfig);
}
