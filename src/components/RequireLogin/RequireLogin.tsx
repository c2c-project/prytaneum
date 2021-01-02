import React from 'react';

import Login from 'pages/Login';
import useStorage from 'hooks/useStorage';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

export default function RequireLogin({ children }: Props) {
    const [isLoggedIn] = useStorage('isLoggedIn');
    // FIXME: onLogin should do what?
    if (!isLoggedIn) return <Login onLogin={() => {}} />;
    return <>{children}</>;
}
