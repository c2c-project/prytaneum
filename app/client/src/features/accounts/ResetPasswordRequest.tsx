import { graphql } from 'react-relay';

const RESET_PASSWORD_FORM_MUTATION = graphql`
    mutation ResetPasswordRequestMutation($input: ResetPasswordForm!) {
        resetPassword(input: $input) {
            isError
            message
            body
        }
    }
`;

export { RESET_PASSWORD_FORM_MUTATION }