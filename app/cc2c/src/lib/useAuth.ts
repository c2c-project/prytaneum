'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import type { Role } from '@local/__generated__/prisma';

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
};

export function useAuth() {
    const { data: session, status } = useSession();
    const [authenticated, setAuthenticated] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        switch (status) {
            case 'loading':
                break;
            case 'unauthenticated':
                setAuthenticated(false);
                setIsLoading(false);
                break;
            case 'authenticated':
                setAuthenticated(true);
                setIsLoading(false);
                break;
        }
    }, [session, status]);

    const user = React.useMemo(() => session?.user, [session?.user]) as User | undefined;
    const isTeacher = React.useMemo(() => user?.role === 'TEACHER' || false, [user?.role]);
    const isAdmin = React.useMemo(() => user?.role === 'ADMIN' || false, [user?.role]);

    return { isLoading, user, authenticated, isTeacher, isAdmin };
}
