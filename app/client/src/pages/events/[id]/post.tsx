import { ConditionalRender } from '@local/components';
import { EventLiveLoader } from '@local/features/events';
import { PreloadedEventPost } from '@local/features/events/EventPost';
import { useRouter } from 'next/router';
import React from 'react';

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
                <PreloadedEventPost eventId={router.query.id as string} />
            </React.Suspense>
        </ConditionalRender>
    );
}
