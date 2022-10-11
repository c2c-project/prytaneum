import React from 'react';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { useRouter } from 'next/router';
import type { liveQuery } from '@local/__generated__/liveQuery.graphql'
import { EventLiveLoader } from '@local/features/events';
import { ConditionalRender } from '@local/components';
import { LIVE_QUERY } from './live';
export interface PreloadedEventLiveProps {
    queryReference: PreloadedQuery<liveQuery>;
}


export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
        disablePadding: true
    };

    return { props: baseProps };
}

export function PrePage({queryReference}: PreloadedEventLiveProps) {
    const router = useRouter()
    const data = usePreloadedQuery<liveQuery>(LIVE_QUERY, queryReference);
    var isActive = data.findSingleEvent?.isActive 

    console.log(isActive)

    if (isActive) {
        var url_arry = window.location.href.split('/')
        url_arry.pop()
        var url = url_arry.join('/')
        
        // navigate back to /live once the event starts
        router.push(url + '/live')
    }
    
    return (
        <h1>pre-event page</h1>
    )
}

export default function Pre(initialQueryRef: PreloadedQuery<liveQuery>) {
    const router = useRouter();
    const id = router.query.id

    const [queryReference, loadQuery] = useQueryLoader(
        LIVE_QUERY, initialQueryRef
    );

    
    React.useEffect(() => {
        loadQuery({eventId: id})
        const interval = setInterval(() => {
            loadQuery({eventId: id}, {fetchPolicy: 'network-only'})
        }, 2000);
        return () => clearInterval(interval)
    }, [])
    
    return (
        <div>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    {queryReference != null && queryReference !== undefined && id !== undefined
                        ? <PrePage queryReference={queryReference} />
                        : <h1>uh</h1>
                    }
                </React.Suspense>
            </ConditionalRender>
        </div>
    )
}