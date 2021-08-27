import * as React from 'react';

import { useRouter } from 'next/router';
// import VerifyEmailComponent from '@local/domains/Auth/VerifyEmail';
// TODO re-add verify email component

interface Props {
    userId: string;
}

export default function VerifyEmail({ userId }: Props) {
    const router = useRouter();

    return ( <div></div>
        // <VerifyEmailComponent
        //     userId={userId}
        //     onSuccess={() => router.push('/login')}
        //     onFailure={() => router.push('/login')}
        // />
    );
}
