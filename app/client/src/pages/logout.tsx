import * as React from 'react';

import { Redirect } from '@local/domains/Logical/Redirect';
import Loader from '@local/components/Loader';
import { useUser } from '@local/hooks/useUser';
import { clear } from '@local/utils/storage';
import { useLogoutQuery } from '@local/graphql-types';

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

    if (isLoading || !isLoggedOut) return <Loader />;

    return <Redirect href='/login' />;
}
