import { graphql } from 'react-relay';

const FORGOT_PASSWORD_FORM_MUTATION = graphql`
    mutation ForgotPasswordFormMutation($input: ForgotPassRequestForm!) {
        requestResetPassword(input: $input) {
            isError
            message
            body
        }
    }
`;

export { FORGOT_PASSWORD_FORM_MUTATION }