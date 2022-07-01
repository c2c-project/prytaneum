import * as React from 'react';
import { useUser } from '@local/features/accounts';

export interface RoleGuardProps {
    authenticated?: boolean;
    organizer?: boolean;
    moderator?: boolean;
    children: JSX.Element | JSX.Element[];
}

export function RoleGuard({ authenticated = false, organizer = false, moderator = false, children }: RoleGuardProps){
    const [user] = useUser();

    if (authenticated) {
        if (user) return <>{children}</>;
    }
    if (organizer) return <>{children}</>
    if (moderator) return <>{children}</>
    return <></>
}