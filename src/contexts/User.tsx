import React from 'react';
import type { User } from 'prytaneum-typings';

import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import { getMyInfo } from 'domains/Auth/api';

export const UserContext = React.createContext<User | null>(null);

interface Props {
    children: JSX.Element | JSX.Element[];
    value?: User;
}

export default function UserProvider({ children, value }: Props) {
    // starts as undefined then becomes either null or User
    const [user, setUser] = React.useState<User | undefined | null>(value);
    const [get, isLoading] = useEndpoint(getMyInfo, {
        onSuccess: ({ data }) => {
            setUser(data);
        },
        onFailure: () => {
            setUser(null);
        },
    });
    React.useEffect(() => {
        if (user === undefined) get();
    }, [get, user]);

    if (isLoading || user === undefined) return <Loader />;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

UserProvider.defaultProps = {
    value: undefined,
};
