import React from 'react';
import Loader from 'components/Loader';
import history from 'utils/history';
import { clear } from 'utils/storage';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category Domains/Auth
 *  @constructor Logout
 */
export default function Logout() {
    // FIXME: send the request to the server too as well
    React.useEffect(() => {
        clear();
        history.push('/auth/login');
    }, []);

    return <Loader />;
}
