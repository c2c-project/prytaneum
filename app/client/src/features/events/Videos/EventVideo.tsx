import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { Skeleton } from '@mui/material';

import type { EventVideoFragment$key } from '@local/__generated__/EventVideoFragment.graphql';
import { VideoPlayer } from '@local/components/VideoPlayer';
import { useRefresh } from '@local/features/core';

export const EVENT_VIDEO_FRAGMENT = graphql`
    fragment EventVideoFragment on Event @refetchable(queryName: "EventVideoRefetchQuery") {
        videos {
            edges {
                cursor
                node {
                    url
                    lang
                }
            }
        }
    }
`;

interface EventVideoProps {
    fragmentRef: EventVideoFragment$key;
}

export function EventVideoLoader() {
    return <Skeleton variant='rectangular' style={{ width: '100%', height: '100%' }} />;
}

export function EventVideo({ fragmentRef }: EventVideoProps) {
    const [data, refetch] = useRefetchableFragment(EVENT_VIDEO_FRAGMENT, fragmentRef);

    const REFRESH_INTERVAL = 20000; // 20 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);
    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    // TODO: better system/user flow for this
    if (!data || !data.videos || !data.videos.edges || data.videos.edges.length === 0) return <VideoPlayer url='' />;

    // TODO: implement switcher for diff languages
    return <VideoPlayer url={data.videos.edges[0].node.url ?? ''} />;
}
