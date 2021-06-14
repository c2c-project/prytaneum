import * as React from 'react';

import { UserContext, UserDispatch } from '@local/features/accounts/UserContext';

export function useUser() {
    const user = React.useContext(UserContext);
    const setUser = React.useContext(UserDispatch);
    if (user === undefined || setUser === undefined)
        throw new Error('useUser() must be used within a UserContextProvider');
    return [user, setUser] as const;
}
