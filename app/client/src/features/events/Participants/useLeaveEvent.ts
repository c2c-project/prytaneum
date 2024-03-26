import React from 'react';
import { useMutation, graphql } from 'react-relay';

import type { useLeaveEventMutation } from '@local/__generated__/useLeaveEventMutation.graphql';

export const PING_EVENT_MUTATION = graphql`
    mutation useLeaveEventMutation($eventId: ID!) {
        participantLeaveEvent(eventId: $eventId) {
            isError
            message
        }
    }
`;

// Pings the server every 20 seconds to keep the participant active in the event participants list
export function useLeaveEvent(eventId: string) {
    const [commit] = useMutation<useLeaveEventMutation>(PING_EVENT_MUTATION);

    const leaveEvent = React.useCallback(() => {
        commit({
            variables: { eventId },
        });
    }, [eventId, commit]);

    return { leaveEvent };
}
