import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEventCreatedSubscription } from '@local/__generated__/useEventCreatedSubscription.graphql';

const USE_EVENT_CREATED_SUBSCRIPTION = graphql`
    subscription useEventCreatedSubscription($connections: [ID!]!) {
        eventCreated {
            edge @prependEdge(connections: $connections) {
                node {
                    id
                    title
                    description
                    startDateTime
                    endDateTime
                    isViewerModerator
                    organization {
                        name
                    }
                }
            }
        }
    }
`;

interface Props {
    connections: string[];
}

export function useEventCreated({ connections }: Props) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useEventCreatedSubscription>>(
        () => ({
            variables: {
                connections,
            },
            subscription: USE_EVENT_CREATED_SUBSCRIPTION,
        }),
        [connections]
    );

    useSubscription<useEventCreatedSubscription>(createdConfig);
}
