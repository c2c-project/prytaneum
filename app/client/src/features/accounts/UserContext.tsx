import React, { SetStateAction } from 'react';
import { graphql } from 'react-relay';

import type { useUserFragment$key } from '@local/__generated__/useUserFragment.graphql';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in the @local/hooks folder
type TState = useUserFragment$key | null | undefined; // undefined means it's not in the tree
// read note above
export const UserContext = React.createContext<TState>(undefined);

type TDispatch = React.Dispatch<SetStateAction<TState>> | undefined;
// read note above
export const UserDispatch = React.createContext<TDispatch>(undefined);

interface UserProps {
    children: React.ReactNode | React.ReactNodeArray;
    userInfo?: useUserFragment$key;
}

export const USER_CONTEXT_QUERY = graphql`
    query UserContextQuery {
        me {
            ...useUserFragment
        }
    }
`;

/**
 * This component attempts to fetch the user once on load of the app
 * Does not block rendering of the app
 */
export function UserProvider({ children, userInfo }: UserProps) {
    const [user, setUser] = React.useState<TState>(userInfo ?? null);

    return (
        <UserContext.Provider value={user}>
            <UserDispatch.Provider value={setUser}>{children}</UserDispatch.Provider>
        </UserContext.Provider>
    );
}
