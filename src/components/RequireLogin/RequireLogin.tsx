import React from 'react';
import { Container } from '@material-ui/core';

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
            <Container>
                <Login onLogin={() => {}} />
            </Container>
        );
    return <>{children}</>;
}
