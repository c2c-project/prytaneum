import React from 'react';
import { makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import { set, init } from 'utils/storage';
import Nav from './Nav';

export default { title: 'layout/Nav' };

export function Basic() {
    return <Nav />;
}

export function LoggedIn() {
    init();
    set('isLoggedIn', true);
    React.useEffect(() => {
        return () => {
            set('isLoggedIn', false);
        };
    }, []);
    return (
        <UserProvider value={makeUser()}>
            <Nav />
        </UserProvider>
    );
}
