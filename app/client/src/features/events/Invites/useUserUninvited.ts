import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useUserUninvitedSubscription } from '@local/__generated__/useUserUninvitedSubscription.graphql';

const USE_USER_UNINVITED_SUBSCRIPTION = graphql`
    subscription useUserUninvitedSubscription($connections: [ID!]!, $eventId: ID!) {
        userUninvited(eventId: $eventId) {
            edge {
                cursor
                node {
                    id @deleteEdge(connections: $connections)
                    firstName
                    lastName
                    email
                    moderatorOf(eventId: $eventId)
                }
            }
        }
    }
`;

interface Props {
    connections: string[];
    eventId: string;
}

export function useUserUninvited({ connections, eventId }: Props) {
    const createdConfig = useMemo<GraphQLSubscriptionConfig<useUserUninvitedSubscription>>(
        () => ({
            variables: {
                connections,
                eventId,
            },
            subscription: USE_USER_UNINVITED_SUBSCRIPTION,
        }),
        [connections, eventId]
    );

    useSubscription<useUserUninvitedSubscription>(createdConfig);
}
