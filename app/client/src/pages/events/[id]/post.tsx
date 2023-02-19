import { ConditionalRender } from '@local/components';
import { EventLiveLoader } from '@local/features/events';
import PreloadedEventPost from '@local/features/events/EventPost';
import { useRouter } from 'next/router';
import React from 'react';

export default function Pre() {
    const router = useRouter();

    if (!router.isReady) return <EventLiveLoader />;
    return (
        <div>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    <PreloadedEventPost eventId={router.query.id as string} />
                </React.Suspense>
            </ConditionalRender>
        </div>
    );
}
