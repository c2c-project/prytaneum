import React from 'react';
import type { User } from 'prytaneum-typings';

import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import { getMyInfo } from 'domains/Auth/api';

export const UserContext = React.createContext<User | undefined>(undefined);

interface Props {
    children: JSX.Element | JSX.Element[];
    value?: User;
}

export default function UserProvider({ children, value }: Props) {
    // check if I'm a child of any other userProvider
    const userFromContext = React.useContext(UserContext);
    // starts as undefined then becomes either null or User
    const [user, setUser] = React.useState<User | undefined>(
        value || userFromContext
    );
    const [get, isLoading] = useEndpoint(getMyInfo, {
        onSuccess: ({ data }) => {
            setUser(data);
        },
        onFailure: () => {},
    });

    React.useEffect(() => {
        if (!user) get();
    }, [get, user]);

    if (isLoading) return <Loader />;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

UserProvider.defaultProps = {
    value: undefined,
};
