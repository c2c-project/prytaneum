import * as React from 'react';

// import { Redirect } from '@local/domains/Logical/Redirect';
import { Loader } from '@local/components/Loader';
import { useUser } from '@local/hooks/useUser';
import { clear } from '@local/utils/storage';
import { useLogoutQuery } from '@local/graphql-types';
import { useApollo } from '@local/utils/apolloClient';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category @local/domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [, setUser] = useUser();
    const [isLoggedOut, setState] = React.useState(false);
    const { loading: isLoading } = useLogoutQuery({
        onCompleted: () => {
            setUser(undefined);
            setState(true);
            clear();
        },
    });
    const apolloClient = useApollo();

    React.useEffect(() => {
        apolloClient.resetStore();
    }, [apolloClient]);
    if (isLoading || !isLoggedOut) return <Loader />;
}
