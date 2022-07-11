import { useEffect, useState } from 'react';
import { useUser } from '@local/features/accounts/useUser';
import { useRouter } from 'next/router';
import Landing from '@local/features/landing/Landing';
import { Loader } from '@local/components/Loader';

export default function Home() {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const [checkComplete, setCheckComplete] = useState<boolean>(false);

    useEffect(() => {
        if (user && !isLoading) router.push('/dashboard');
        if (!user && !isLoading) setCheckComplete(true);
    }, [user, router, isLoading]);

    return checkComplete ? <Landing /> : <Loader />;
}
