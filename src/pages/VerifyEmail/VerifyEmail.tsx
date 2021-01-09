import React from 'react';

import history from 'utils/history';
import VerifyEmailComponent from 'domains/Auth/VerifyEmail';

interface Props {
    userId: string;
}

export default function VerifyEmail({ userId }: Props) {
    return (
        <VerifyEmailComponent
            userId={userId}
            onSuccess={() => history.push('/login')}
            onFailure={() => history.push('/login')}
        />
    );
}
