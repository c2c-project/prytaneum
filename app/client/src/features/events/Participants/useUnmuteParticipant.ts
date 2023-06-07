import { useMutation, graphql } from 'react-relay';

import type { useUnmuteParticipantMutation } from '@local/__generated__/useUnmuteParticipantMutation.graphql';

export const UNMUTE_PARTICIPANT_MUTATION = graphql`
    mutation useUnmuteParticipantMutation($eventId: ID!, $userId: ID!) {
        unmuteParticipant(eventId: $eventId, userId: $userId) {
            isError
            message
        }
    }
`;

export function useUnmuteParticipant() {
    const [commit] = useMutation<useUnmuteParticipantMutation>(UNMUTE_PARTICIPANT_MUTATION);

    return { unmuteParticipant: commit };
}
