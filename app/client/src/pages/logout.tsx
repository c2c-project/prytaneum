import * as React from 'react';

import Redirect from '@local/domains/Logical/Redirect';
import useEndpoint from '@local/hooks/useEndpoint';
import Loader from '@local/components/Loader';
import useUser from '@local/hooks/useUser';
import { clear } from '@local/utils/storage';
import { logout } from '@local/domains/Auth/api';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category @local/domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [isLoggedOut, setState] = React.useState(false);
    const [, setUser] = useUser();
    const [, isLoading] = useEndpoint(logout, {
        onSuccess: () => {
            clear();
            setUser(undefined);
            setState(true);
        },
        runOnFirstRender: true,
    });

    if (isLoading || !isLoggedOut) return <Loader />;

    return <Redirect href='/login' />;
}
