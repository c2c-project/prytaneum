import { graphql } from 'react-relay';

export const QUESTION_DEQUEUED_SUBSCRIPTION = graphql`
    subscription QuestionDequeuedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionDequeued(eventId: $eventId) @deleteEdge(connections: $connections) {
            cursor
            node {
                id
                ...QuestionAuthorFragment
                ...QuestionStatsFragment
                ...QuestionContentFragment
                position
            }
        }
    }
`;
