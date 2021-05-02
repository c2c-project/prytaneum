import * as React from 'react';
import type { Roles } from 'prytaneum-typings';

import useUser from './useUser';

export default function useRoleQuery(requiredRoles: Roles[]) {
    const [user] = useUser();
    const isUserAllowed = React.useMemo(
        () => user && user.roles.some((role) => requiredRoles.includes(role)),
        [requiredRoles, user]
    );

    return isUserAllowed;
}
