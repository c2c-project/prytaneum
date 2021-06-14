import React, { SetStateAction } from 'react';
import { graphql, loadQuery } from 'react-relay';

import type { UserQuery } from '@local/__generated__/UserQuery.graphql';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in the @local/hooks folder
type TState = NonNullable<UserQuery['response']>['me'] | undefined; // undefined means it's not in the tree
// read note above
export const UserContext = React.createContext<TState>(undefined);

type TDispatch = React.Dispatch<SetStateAction<TState>> | undefined;
// read note above
export const UserDispatch = React.createContext<TDispatch>(undefined);

interface UserProps {
    children: React.ReactNode | React.ReactNodeArray;
    userInfo?: UserQuery['response'];
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

/**
 * This component attempts to fetch the user once on load of the app
 * Does not block rendering of the app
 */
export function UserProvider({ children, userInfo }: UserProps) {
    const [user, setUser] = React.useState<TState>(userInfo?.me ?? null);

    return (
        <UserContext.Provider value={user}>
            <UserDispatch.Provider value={setUser}>{children}</UserDispatch.Provider>
        </UserContext.Provider>
    );
}

export function loadUser() {}
