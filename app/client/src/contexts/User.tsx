import React, { SetStateAction } from 'react';
import type { ClientSafeUser } from 'prytaneum-typings';

import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import { getMyInfo } from 'domains/Auth/api';

// NOTE: don't use React.useContext with either of the below,
// instead use the "useUser" hook found in the hooks folder

type State = ClientSafeUser | undefined | null; // null = means it's not in the tree
// read note above
export const UserContext = React.createContext<State>(null);

type Dispatch = React.Dispatch<SetStateAction<State>> | null;
// read note above
export const UserDispatch = React.createContext<Dispatch>(null);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    value?: ClientSafeUser;
    /**
     * should only be used for storybook purposes
     */
    forceNoLogin?: boolean;
}

/**
 * This component attempts to fetch the user once on load of the app
 */
export default function UserProvider({ children, value, forceNoLogin }: Props) {
    // this is initially undefined due to defaultProps declaration
    const [user, setUser] = React.useState<State>(value);

    const [run, isLoading, getHasRun] = useEndpoint(getMyInfo, {
        onSuccess: ({ data }) => {
            setUser(data);
        },
        // so the default error handler is not used
        onFailure: () => {},
        minWaitTime: 0,
    });

    // runs only if the request hasn't run once and there's no user
    React.useEffect(() => {
        if (!getHasRun() && !user && !forceNoLogin) run();
    }, [getHasRun, user, run, forceNoLogin]);

    // TODO: redirect to login?

    // if the request is either loading or hasn't run AND there's no user
    // then show a loader
    if (!forceNoLogin && (isLoading || !getHasRun()) && !user) return <Loader />;

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
