import { useMutation, graphql } from 'react-relay';

import type { useMuteParticipantMutation } from '@local/__generated__/useMuteParticipantMutation.graphql';

export const MUTE_PARTICIPANT_MUTATION = graphql`
    mutation useMuteParticipantMutation($eventId: ID!, $userId: ID!) {
        muteParticipant(eventId: $eventId, userId: $userId) {
            isError
            message
        }
    }
`;

export function useMuteParticipant() {
    const [commit] = useMutation<useMuteParticipantMutation>(MUTE_PARTICIPANT_MUTATION);

    return { muteParticipant: commit };
}
