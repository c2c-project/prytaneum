import React from 'react';
import { UserContext } from 'contexts/User';

import Page from 'layout/Page';
import Login from 'pages/Auth/Login';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function RequireLogin({ children }: Props) {
    const user = React.useContext(UserContext);
    const [state, setState] = React.useState(Boolean(user));
    if (!state)
        return (
            <Page>
                <Login onLogin={() => setState(true)} />
            </Page>
        );
    return <>{children}</>;
}
