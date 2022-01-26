import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQueryLoader } from 'react-relay';

import { EventSettingsQuery } from '@local/__generated__/EventSettingsQuery.graphql';
import { EventSettings, EVENT_SETTINGS_QUERY } from '@local/features/events';
import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';

const Page: NextPage = () => {
    const router = useRouter();
    const [user,, isLoading] = useUser();
    const { id: eventId } = router.query as { id: string };
    const [queryRef, loadQuery] = useQueryLoader<EventSettingsQuery>(EVENT_SETTINGS_QUERY);

    React.useEffect(() => {
        if (router.isReady) loadQuery({ input: eventId });
    }, [router.isReady, loadQuery, eventId]);

    React.useEffect(() => {
        if (!isLoading && !user) router.push('/')
    }, [isLoading, router, user]);

    if (!router.isReady || !queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading...'>
            <EventSettings queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
