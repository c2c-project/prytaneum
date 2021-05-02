import * as React from 'react';
import type { Roles } from 'prytaneum-typings';

import useRoleQuery from '@local/hooks/useRoleQuery';
import useUser from '@local/hooks/useUser';
import Redirect from '../Redirect';

interface Props {
    requiredRoles: Roles[];
    children: React.ReactElement;
    redirect?: boolean;
}

export default function RequireRoles({
    requiredRoles,
    children,
    redirect,
}: Props) {
    const [user] = useUser();
    const isAllowed = useRoleQuery(requiredRoles);

    // TODO: make more robust
    if (!user || !isAllowed)
        return redirect ? <Redirect href='/logout' /> : <></>;

    return children;
}

RequireRoles.defaultProps = {
    redirect: true,
};
