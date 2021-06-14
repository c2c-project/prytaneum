import * as React from 'react';

export const QueryContext = React.createContext<string | undefined>(undefined);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    query: string | undefined;
}

export default function QueryProvider({ children, query }: Props) {
    return (
        <QueryContext.Provider value={query}>{children}</QueryContext.Provider>
    );
}
