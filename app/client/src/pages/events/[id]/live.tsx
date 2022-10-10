import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import { ConditionalRender } from '@local/components';
import { PreloadedEventLive, EventLiveLoader } from '@local/features/events';
import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import type { liveQuery } from '@local/__generated__/liveQuery.graphql'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(0, 3), // add side padding since layout padding is disabled
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(3, 3, 0, 3), // add top padding so event video doesn't touch navbar
        },
    },
}));

export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
        disablePadding: true
    };

    return { props: baseProps };
}

export interface LiveProps {
    queryRef: PreloadedQuery<liveQuery>;
}

export const LIVE_QUERY = graphql`
    query liveQuery($eventId: ID!) {
        findSingleEvent(id: $eventId) {
            isActive
            isViewerModerator
        }
    }
`

export default function Live(initialQueryRef: PreloadedQuery<liveQuery>) {
    const router = useRouter();
    const classes = useStyles();
    const id = router.query.id

    const [queryReference, loadQuery] = useQueryLoader(
        LIVE_QUERY, initialQueryRef
    );

    React.useEffect(() => {
        loadQuery({eventId: id})
    }, [])

    if (!router.isReady) return <EventLiveLoader />;

    return (
        <div className={classes.root}>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    {/* check if router.query.id has started here
                        if yes => route to event
                        if not => route to pre-event page */}
                    {queryReference != null
                        ? <PreloadedEventLive queryReference={queryReference} eventId={router.query.id as string} token={router.query.token as string} />
                        : null
                    }
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <EventLiveLoader />
            </ConditionalRender>
        </div>
    );
};
