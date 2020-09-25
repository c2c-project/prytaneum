import React from 'react';
import { User } from 'types';

interface UserContext {
    // where null means there is no currently logged in user
    user: User | null;
    setUser: (u: User) => void;
}

export default React.createContext<UserContext>({
    user: null,
    setUser: () => {},
});
