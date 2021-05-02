import * as React from 'react';
import { QueryContext } from '@local/contexts/Query';

export function useQuery() {
    const query = React.useContext(QueryContext);
    if (!query) return undefined;

    return query;
}
