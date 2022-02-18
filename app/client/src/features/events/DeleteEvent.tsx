import { graphql } from 'react-relay';

const DELETE_EVENT_MUTATION = graphql`
    mutation DeleteEventMutation($input: DeleteEvent!) {
        deleteEvent(event: $input) {
            isError
            message
            body {
                id
                title
                topic
                startDateTime
            }
        }
    }
`;

export { DELETE_EVENT_MUTATION }