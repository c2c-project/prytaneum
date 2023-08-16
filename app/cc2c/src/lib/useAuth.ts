'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export type User = {
    id: string;
    name: string;
    email: string;
    isTeacher: boolean;
    isAdmin: boolean;
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
    const isTeacher = React.useMemo(() => user?.isTeacher || false, [user?.isTeacher]);
    const isAdmin = React.useMemo(() => user?.isAdmin || false, [user?.isAdmin]);

    return { isLoading, user, authenticated, isTeacher, isAdmin };
}
