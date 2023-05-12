import { useMutation, graphql } from 'react-relay';

import type { usePingEventMutation } from '@local/__generated__/usePingEventMutation.graphql';

export const PING_EVENT_MUTATION = graphql`
    mutation usePingEventMutation($eventId: ID!) {
        participantPingEvent(eventId: $eventId) {
            isError
            message
        }
    }
`;

export function usePingEvent() {
    const [commit] = useMutation<usePingEventMutation>(PING_EVENT_MUTATION);

    return { pingEvent: commit };
}
