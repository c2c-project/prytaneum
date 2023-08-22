'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

interface Props {
    authenticationRequired: boolean;
    teacherRequired?: boolean;
    adminRequired?: boolean;
}

export function useProtectedRoute({ authenticationRequired, teacherRequired = false, adminRequired = false }: Props) {
    const router = useRouter();
    const { isLoading, authenticated, isTeacher, isAdmin } = useAuth();
    const [routeValidated, setRouteValidated] = React.useState(false);

    React.useEffect(() => {
        if (isLoading) return;
        if (
            (authenticationRequired && !authenticated) ||
            (teacherRequired && !isTeacher) ||
            (adminRequired && !isAdmin)
        ) {
            router.replace('/');
            return;
        }
        setRouteValidated(true);
    }, [isLoading, authenticated, isTeacher, isAdmin, authenticationRequired, teacherRequired, adminRequired, router]);

    return { routeValidated };
}
