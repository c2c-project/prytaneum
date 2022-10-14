import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import { ConditionalRender } from '@local/components';
import { PreloadedEventLive, EventLiveLoader } from '@local/features/events';

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

const Live: NextPage = () => {
    const router = useRouter();
    const classes = useStyles();
    
    if (!router.isReady) return <EventLiveLoader />;

    return (
        <div className={classes.root}>
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    <PreloadedEventLive eventId={router.query.id as string} token={router.query.token as string} />
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <EventLiveLoader />
            </ConditionalRender>
        </div>
    );
};


export default Live;