import React from 'react';

import Page from 'layout/Page';
import Login from 'pages/Auth/Login';
import useStorage from 'hooks/useStorage';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function RequireLogin({ children }: Props) {
    const [isLoggedIn] = useStorage('isLoggedIn');
    // FIXME: onLogin should do what?
    if (!isLoggedIn)
        return (
            <Page>
                <Login onLogin={() => {}} />
            </Page>
        );
    return <>{children}</>;
}
