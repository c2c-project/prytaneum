import React from 'react';

import Redirect from 'components/Redirect';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import useUser from 'hooks/useUser';
import { clear } from 'utils/storage';
import { logout } from 'domains/Auth/api';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category Domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [isLoggedOut, setState] = React.useState(false);
    const [, setUser] = useUser();
    const [sendRequest, isLoading] = useEndpoint(logout, {
        onSuccess: () => {
            clear();
            setUser(undefined);
            setState(true);
        },
    });
    React.useEffect(sendRequest, []);

    if (isLoading || !isLoggedOut) return <Loader />;

    return <Redirect href='/login' />;
}
