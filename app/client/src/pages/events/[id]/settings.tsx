import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQueryLoader } from 'react-relay';

import { EventSettingsQuery } from '@local/__generated__/EventSettingsQuery.graphql';
import { EventSettings, EVENT_SETTINGS_QUERY } from '@local/features/events';

const Page: NextPage = () => {
    const router = useRouter();
    const { id: eventId } = router.query as { id: string };
    const [queryRef, loadQuery] = useQueryLoader<EventSettingsQuery>(EVENT_SETTINGS_QUERY);

    React.useEffect(() => {
        if (router.isReady) loadQuery({ input: eventId });
    }, [router.isReady, loadQuery, eventId]);

    if (!router.isReady || !queryRef) return <div>Loading...</div>;

    return (
        <React.Suspense fallback='loading...'>
            <EventSettings queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
