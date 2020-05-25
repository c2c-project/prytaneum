import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import VerifyEmailComponent from 'domains/Auth/VerifyEmail';
import routes from '../routes';

export default function VerifyEmail() {
    const history = useHistory();
    const { userId } = useParams();

    return (
        <VerifyEmailComponent
            userId={userId}
            onSuccess={() => history.push(routes.login)}
            onFailure={() => history.push(routes.login)}
        />
    );
}
