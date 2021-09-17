import { graphql } from 'react-relay';

export const VALIDATE_INVITE_QUERY = graphql`
    query ValidateInviteQuery($token: String!, $eventId: ID!) {
        validateInvite(input: { token: $token, eventId: $eventId }) {
            valid
        }
    }
`;