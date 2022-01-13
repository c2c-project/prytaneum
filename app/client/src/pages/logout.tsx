import * as React from 'react';
import { useMutation, graphql } from 'react-relay';
import { useRouter } from 'next/router';

// import { Redirect } from '@local/domains/Logical/Redirect';
import { logoutMutation } from '@local/__generated__/logoutMutation.graphql';
import { Loader } from '@local/components/Loader';
import { useIsClient, useEnvironment } from '@local/features/core';
import { useUser } from '@local/features/accounts';

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
    const [user, setUser] = useUser();
    const { resetEnv } = useEnvironment();
    const [runMutation] = useMutation<logoutMutation>(LOGOUT_MUTATION);
    const isClient = useIsClient();
    const router = useRouter();

    React.useEffect(() => {
        if (!isClient) return;
        runMutation({
            variables: {},
            onCompleted() {
                resetEnv();
                setUser(null);
                router.push('/')
            },
        });
    }, [runMutation, isClient, resetEnv, setUser, router, user]);

    return <Loader />;
}
