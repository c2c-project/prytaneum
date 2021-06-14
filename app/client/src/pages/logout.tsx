import * as React from 'react';
import { useMutation, graphql } from 'react-relay';

// import { Redirect } from '@local/domains/Logical/Redirect';
import { logoutMutation } from '@local/__generated__/logoutMutation.graphql';
import { Loader } from '@local/components/Loader';
import { useUser, useIsClient, useEnvironment } from '@local/hooks';

const LOGOUT_MUTATION = graphql`
    mutation logoutMutation {
        logout
    }
`;

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category @local/domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [, setUser] = useUser();
    const { resetEnv } = useEnvironment();
    const [isLoggedOut, setState] = React.useState(false);
    const [runMutation, isLoading] = useMutation<logoutMutation>(LOGOUT_MUTATION);
    const isClient = useIsClient();

    React.useEffect(() => {
        if (isClient) {
            runMutation({
                variables: {},
                onCompleted() {
                    setState(true);
                    resetEnv();
                    setUser(null);
                },
            });
        }
    }, [runMutation, isClient, resetEnv]);

    if (isLoading || !isLoggedOut) return <Loader />;
}
