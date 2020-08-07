import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import VerifyEmailComponent from 'domains/Auth/VerifyEmail';
import routeNames from '../route-names';

interface Params {
    userId?: string;
}

// TODO: make this more resilient -- display an error message to the user instead of just redirecting
export default function VerifyEmail() {
    const history = useHistory();
    const { userId } = useParams<Params>();

    return userId ? (
        <VerifyEmailComponent
            userId={userId}
            onSuccess={() => history.push(routeNames.login)}
            onFailure={() => history.push(routeNames.login)}
        />
    ) : (
        <Redirect to={routeNames.login} />
    );
}
