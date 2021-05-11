import * as React from 'react';

import { UserContext, UserDispatch } from '@local/contexts/User';

export function useUser() {
    const user = React.useContext(UserContext);
    const setUser = React.useContext(UserDispatch);
    if (user === null || setUser === null) throw new Error('useUser() must be used within a UserContextProvider');
    return [user, setUser] as const;
}
