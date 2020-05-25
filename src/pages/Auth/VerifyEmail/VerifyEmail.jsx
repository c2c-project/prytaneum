import React from 'react';
import { useHistory } from 'react-router-dom';

import VerifyEmailComponent from 'domains/Auth/VerifyEmail';

export default function VerifyEmail() {
    const history = useHistory();
    return (
        <VerifyEmailComponent
            onSuccess={() => history.push('/login')}
            onFailure={() => history.push('/login')}
        />
    );
}
