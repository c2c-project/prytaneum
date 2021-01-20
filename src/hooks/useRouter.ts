import React from 'react';
import UniversalRouter, { Routes } from 'universal-router/sync';

export default function useRouter<T, U>(routes: Routes<T, U>) {
    const router = React.useMemo(() => new UniversalRouter<T, U>(routes), [
        routes,
    ]);
    return router;
}
