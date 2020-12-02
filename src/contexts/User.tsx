import React from 'react';
import type { User } from 'prytaneum-typings';

import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import { getMyInfo } from 'domains/Auth/api';
import Redirect from 'components/Redirect';

export const UserContext = React.createContext<User | undefined>(undefined);

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
    if (user === null) return <Redirect href='/home' />; // means that theres something wrong

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

UserProvider.defaultProps = {
    value: undefined,
};
