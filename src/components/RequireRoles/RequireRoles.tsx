import React from 'react';
import type { Roles } from 'prytaneum-typings';

import { UserContext } from 'contexts/User';
import Redirect from '../Redirect';

interface Props {
    requiredRoles: Roles[];
    children: React.ReactNodeArray | React.ReactNode;
}

export default function RequireRoles({ requiredRoles, children }: Props) {
    const user = React.useContext(UserContext);
    const isUserAllowed = React.useMemo(
        () => user && user.roles.some((role) => requiredRoles.includes(role)),
        [requiredRoles, user]
    );

    // TODO: make more robust
    if (!user && !isUserAllowed) return <Redirect href='/logout' />;

    return <>{children}</>;
}
