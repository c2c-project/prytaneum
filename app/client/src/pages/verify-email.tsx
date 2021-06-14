import * as React from 'react';

import history from '@local/utils/history';
import VerifyEmailComponent from '@local/domains/Auth/VerifyEmail';

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
