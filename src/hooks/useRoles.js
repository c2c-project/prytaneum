import React from 'react';
import useJwt from './useJwt';

export default function useRoles(roles = []) {
    const [jwt] = useJwt();
    const [hasRoles, setHasRoles] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;
        fetch('/api/users/authenticate', {
            method: 'POST',
            body: JSON.stringify({ requiredAny: roles }),
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        }).then((r) => {
            r.json().then((result) => {
                if (isMounted) {
                    setHasRoles(result.allowed);
                    setLoading(false);
                }
            });
        });
        return () => {
            isMounted = false;
        };
    }, [jwt]);

    return [isLoading, hasRoles];
}
