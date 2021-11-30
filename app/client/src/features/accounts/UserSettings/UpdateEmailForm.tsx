import { graphql } from 'react-relay';

const UPDATE_EMAIL_FORM_MUTATION = graphql`
    mutation UpdateEmailFormMutation($input: UpdateEmailForm!) {
        updateEmail(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

export { UPDATE_EMAIL_FORM_MUTATION }