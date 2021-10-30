
import { graphql } from 'react-relay';

const FORGOT_PASSWORD_FORM_MUTATION = graphql`
    mutation ForgotPasswordFormMutation($input: ForgotPassRequestForm!) {
        resetPassword(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

export { FORGOT_PASSWORD_FORM_MUTATION }