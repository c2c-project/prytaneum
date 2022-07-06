import { useMemo } from 'react';

import { ConnectionHandler } from 'relay-runtime';

export function useConnection(recordId: string, key: string) {
    return useMemo(() => {
        const connection = ConnectionHandler.getConnectionID(recordId, key);
        return connection;
    }, [recordId, key]);
}
