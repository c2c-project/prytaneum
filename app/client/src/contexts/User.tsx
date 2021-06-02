import React, { SetStateAction } from 'react';
import { graphql, usePreloadedQuery, PreloadedQuery, useQueryLoader } from 'react-relay';

import { UserQuery } from '@local/__generated__/UserQuery.graphql';
import { User } from '@local/graphql-types';
import { useIsClient } from '@local/hooks';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in the @local/hooks folder

type TState = User | undefined | null; // undefined means it's not in the tree
// read note above
export const UserContext = React.createContext<TState>(undefined);

type TDispatch = React.Dispatch<SetStateAction<TState>> | undefined;
// read note above
export const UserDispatch = React.createContext<TDispatch>(undefined);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

export const USER_QUERY = graphql`
    query UserQuery {
        me {
            id
            firstName
            lastName
            email
        }
    }
`;

function UserProviderWithUser({
    queryRef,
    setUser,
    children,
}: {
    queryRef: PreloadedQuery<UserQuery>;
    setUser: NonNullable<TDispatch>;
    children: React.ReactElement;
}) {
    const data = usePreloadedQuery(USER_QUERY, queryRef);
    React.useEffect(() => {
        setUser(data.me);
    }, [data, setUser]);
    return children;
}

/**
 * This component attempts to fetch the user once on load of the app
 * Does not block rendering of the app
 */
export function UserProvider({ children }: Props) {
    const isClient = useIsClient();
    const [user, setUser] = React.useState<TState>(null);
    const [queryRef, loadQuery] = useQueryLoader<UserQuery>(USER_QUERY);

    React.useEffect(() => {
        if (isClient) loadQuery({});
    }, [isClient, loadQuery]);

    if (!isClient)
        return (
            <UserContext.Provider value={user}>
                <UserDispatch.Provider value={setUser}>{children}</UserDispatch.Provider>
            </UserContext.Provider>
        );

    return (
        <React.Suspense fallback='loading...'>
            <UserContext.Provider value={user}>
                <UserDispatch.Provider value={setUser}>
                    {queryRef ? (
                        <UserProviderWithUser queryRef={queryRef} setUser={setUser}>
                            {children as React.ReactElement}
                        </UserProviderWithUser>
                    ) : (
                        <>{children}</>
                    )}
                </UserDispatch.Provider>
            </UserContext.Provider>
        </React.Suspense>
    );
}
