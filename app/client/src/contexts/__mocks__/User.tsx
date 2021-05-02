import React from 'react';
import { makeUser } from 'prytaneum-typings';

export const UserContext = React.createContext(makeUser());

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function UserContextProvider({ children }: Props) {
    return (
        <UserContext.Provider value={makeUser()}>
            {children}
        </UserContext.Provider>
    );
}
