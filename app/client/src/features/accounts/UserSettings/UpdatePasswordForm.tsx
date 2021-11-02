import { graphql } from 'react-relay';

const UPDATE_PASSWORD_FORM_MUTATION = graphql`
    mutation UpdatePasswordFormMutation($input: UpdatePasswordForm!) {
        updatePassword(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

export { UPDATE_PASSWORD_FORM_MUTATION }