import React, { SetStateAction } from 'react';
import { graphql } from 'react-relay';

import type { useUserFragment$key } from '@local/__generated__/useUserFragment.graphql';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in this same folder
type TUserState = useUserFragment$key | null | undefined; // undefined means it's not in the tree
type TLoadingState = boolean;
type TUserContext = {
    userState: TUserState;
    isLoadingState: TLoadingState;
}

// read note above
export const UserContext = React.createContext<TUserContext>({ userState: undefined, isLoadingState: true });

type TUserDispatch = {
    userDispatch: React.Dispatch<SetStateAction<TUserState>> | undefined;
    isLoadingDispatch: React.Dispatch<SetStateAction<TLoadingState>> | undefined;
}
// read note above
export const UserDispatch = React.createContext<TUserDispatch>({ userDispatch: undefined, isLoadingDispatch: undefined });

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
    const [user, setUser] = React.useState<TUserState>(userInfo ?? null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    return (
        <UserContext.Provider value={{ userState: user, isLoadingState: isLoading }}>
            <UserDispatch.Provider value={{ userDispatch: setUser, isLoadingDispatch: setIsLoading }}>{children}</UserDispatch.Provider>
        </UserContext.Provider>
    );
}
