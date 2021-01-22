import React from 'react';

import Login from 'pages/Login';
import useUser from 'hooks/useUser';

interface Props {
    children: React.ReactElement;
}

export default function RequireLogin({ children }: Props) {
    const [user] = useUser();
    if (!user) return <Login />;
    return children;
}
