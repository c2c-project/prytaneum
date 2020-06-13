import React from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import VerifyEmailComponent from 'domains/Auth/VerifyEmail';
import routes from '../routes';

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
            onSuccess={() => history.push(routes.login)}
            onFailure={() => history.push(routes.login)}
        />
    ) : (
        <Redirect to='/login' />
    );
}
