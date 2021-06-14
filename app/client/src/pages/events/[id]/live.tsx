import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ConditionalRender } from '@local/components';
import { PreloadedEventLive, EventLiveLoader } from '@local/features/events';

export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
    };

    return { props: baseProps };
}

const Live: NextPage = () => {
    const router = useRouter();

    if (!router.isReady) return <EventLiveLoader />;

    return (
        <>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    <PreloadedEventLive eventId={router.query.id as string} />
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <EventLiveLoader />
            </ConditionalRender>
        </>
    );
};

export default Live;
