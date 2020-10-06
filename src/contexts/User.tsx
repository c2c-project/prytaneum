import React from 'react';

import Loader from 'components/Loader';
import { User } from 'types';
import useEndpoint from 'hooks/useEndpoint';
import { getMyInfo } from 'domains/Auth/api';
import Redirect from 'components/Redirect';

export const UserContext = React.createContext<User | undefined>(undefined);

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function UserContextProvider({ children }: Props) {
    // starts as undefined then becomes either null or User
    const [user, setUser] = React.useState<User | undefined | null>();
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
    }, []);

    if (isLoading || user === undefined)
        return (
            <div style={{ height: '500px' }}>
                <Loader />
            </div>
        );
    if (user === null) return <Redirect href='/home' />; // means that theres something wrong

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
