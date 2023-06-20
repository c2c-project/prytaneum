import * as React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@local/features/accounts';

export default function Title() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const isLoggedIn = React.useMemo(() => !isLoading && user !== null, [isLoading, user]);

    const handleClick = () => {
        if (isLoggedIn) router.push('/dashboard');
        else router.push('/');
    };

    return (
        <div style={{ display: 'flex', flexGrow: 1 }}>
            <div
                style={{
                    display: 'flex',
                    flexShrink: 1,
                    flexGrow: 0,
                    width: 25,
                    cursor: 'pointer',
                    marginRight: '15px',
                }}
            >
                <img
                    data-test-id='prytaneum-title-logo'
                    src='/static/p_logo_2.svg'
                    alt='Prytaneum Logo'
                    style={{ width: 50, height: 50, padding: 4, objectFit: 'contain' }}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}
