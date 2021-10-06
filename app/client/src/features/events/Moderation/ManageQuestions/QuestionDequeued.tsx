import { graphql } from 'react-relay';

export const QUESTION_DEQUEUED_SUBSCRIPTION = graphql`
    subscription QuestionDequeuedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionDequeued(eventId: $eventId) {
            cursor
            node {
                id @deleteEdge(connections: $connections)
                ...QuestionAuthorFragment
                ...QuestionStatsFragment
                ...QuestionContentFragment
                position
            }
        }
    }
`;
