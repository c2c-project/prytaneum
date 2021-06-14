import * as React from 'react';
import { graphql, useFragment } from 'react-relay';

import { UserContext, UserDispatch } from '@local/features/accounts/UserContext';

export const USE_USER_FRAGMENT = graphql`
    fragment useUserFragment on User {
        id
        firstName
        lastName
        email
        avatar
    }
`;

export function useUser() {
    const userFragment = React.useContext(UserContext);
    const setUser = React.useContext(UserDispatch);
    if (userFragment === undefined || setUser === undefined)
        throw new Error('useUser() must be used within a UserContextProvider');
    const user = useFragment(USE_USER_FRAGMENT, userFragment);

    return [user, setUser] as const;
}
