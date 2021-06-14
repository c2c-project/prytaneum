import { graphql, useFragment } from 'react-relay';
import { Skeleton } from '@material-ui/lab';

import type { EventVideoFragment$key } from '@local/__generated__/EventVideoFragment.graphql';
import { VideoPlayer } from '@local/components/VideoPlayer';

export const EVENT_VIDEO_FRAGMENT = graphql`
    fragment EventVideoFragment on Event {
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
    return <Skeleton variant='rect' style={{ width: '100%', height: '100%' }} />;
}

export function EventVideo({ fragmentRef }: EventVideoProps) {
    const data = useFragment(EVENT_VIDEO_FRAGMENT, fragmentRef);

    // TODO: better system/user flow for this
    if (!data || !data.videos || !data.videos.edges || data.videos.edges.length === 0) return <VideoPlayer url='' />;

    // TODO: implement switcher for diff languages
    return <VideoPlayer url={data.videos.edges[0].node.url ?? ''} />;
}
