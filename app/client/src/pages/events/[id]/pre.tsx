import React from 'react';
import { useRouter } from 'next/router';
import { EventLiveLoader } from '@local/features/events';
import { ConditionalRender } from '@local/components';
import { PreloadedEventPre } from '@local/features/events/EventPre';

export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
        disablePadding: true,
    };

    return { props: baseProps };
}

export default function Pre() {
    const router = useRouter();

    if (!router.isReady) return <EventLiveLoader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<EventLiveLoader />}>
                <PreloadedEventPre eventId={router.query.id as string} />
            </React.Suspense>
        </ConditionalRender>
    );
}
