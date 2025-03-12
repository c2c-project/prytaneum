import { graphql } from 'react-relay';

const UPDATE_USER_NAME_FORM_MUTATION = graphql`
    mutation UpdateUserNameFormMutation($input: UpdateUserNameForm!) {
        updateUserName(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

export { UPDATE_USER_NAME_FORM_MUTATION };
