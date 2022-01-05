import { useMutation, graphql } from 'react-relay';

// import { Redirect } from '@local/domains/Logical/Redirect';
import { logoutMutation } from '@local/__generated__/logoutMutation.graphql';
import { useIsClient, useEnvironment } from '@local/features/core';
import { useUser } from '@local/features/accounts';

const LOGOUT_MUTATION = graphql`
    mutation logoutMutation {
        logout
    }
`;

interface Props {
    onComplete?: () => void;
}

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category @local/domains/Auth
 *  @constructor Logout
 */
export default function useLogout({ onComplete }: Props) {
    const [, setUser] = useUser();
    const { resetEnv } = useEnvironment();
    const [runMutation] = useMutation<logoutMutation>(LOGOUT_MUTATION);
    const isClient = useIsClient();

    const logoutUser = () => {
        if (isClient) {
            runMutation({
                variables: {},
                onCompleted() {
                    setUser(null);
                    resetEnv();
                    if (onComplete) onComplete();
                },
            });
        }
    }

    return { logoutUser };
}
