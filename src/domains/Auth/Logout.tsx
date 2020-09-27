import React from 'react';
import Loader from 'components/Loader';
import history from 'utils/history';
import { clear } from 'utils/storage';

export default function Logout() {
    // FIXME: send the request to the server too as well
    React.useEffect(() => {
        clear();
        history.push('/auth/login');
    }, []);

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <Loader />
        </div>
    );
}
