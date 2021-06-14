import { useState, useEffect } from 'react';

/**
 * simple helper function to tell the component is on the client or server
 */
export function useIsClient() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return isClient;
}
