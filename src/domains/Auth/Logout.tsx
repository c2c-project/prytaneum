import React from 'react';

import Redirect from 'components/Redirect';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { clear } from 'utils/storage';
import { logout } from './api';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category Domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    const [sendRequest, isLoading] = useEndpoint(logout, {
        onSuccess: clear,
    });
    React.useEffect(sendRequest, []);

    if (isLoading) return <Loader />;

    return <Redirect href='/auth/login' />;
}
