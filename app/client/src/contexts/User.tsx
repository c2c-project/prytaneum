import React, { SetStateAction } from 'react';

import { User, useMyUserInfoQuery } from '@local/graphql-types';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in the @local/hooks folder

type State = User | undefined | null; // null = means it's not in the tree
// read note above
export const UserContext = React.createContext<State>(null);

type Dispatch = React.Dispatch<SetStateAction<State>> | null;
// read note above
export const UserDispatch = React.createContext<Dispatch>(null);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    value?: User;
    /**
     * should only be used for storybook purposes
     */
    forceNoLogin?: boolean;
}

/**
 * This component attempts to fetch the user once on load of the app
 * Does not block rendering of the app
 */
export function UserProvider({ children, value, forceNoLogin }: Props) {
    // this is initially undefined due to defaultProps declaration
    const [user, setUser] = React.useState<State>(value);

    const { data } = useMyUserInfoQuery();

    React.useEffect(() => {
        if (data && data.me) setUser(data.me);
    }, [data]);

    return (
        <UserContext.Provider value={user}>
            <UserDispatch.Provider value={setUser}>{children}</UserDispatch.Provider>
        </UserContext.Provider>
    );
}

UserProvider.defaultProps = {
    value: undefined,
    forceNoLogin: false,
};
