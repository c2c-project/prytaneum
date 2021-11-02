import { graphql } from 'react-relay';

const DELETE_ACCOUNT_FORM_MUTATION = graphql`
    mutation DeleteAccountFormMutation($input: DeleteAccountForm!) {
        deleteAccount(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

export { DELETE_ACCOUNT_FORM_MUTATION }