import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ConditionalRender } from '@local/components';
import { PreloadedEventLiveModratorView, EventLiveLoader } from '@local/features/events';

export async function getServerSideProps() {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
        disablePadding: true,
    };

    return { props: baseProps };
}

const Mod: NextPage = () => {
    const theme = useTheme();
    const lgDownBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
    const router = useRouter();

    if (!router.isReady) return <EventLiveLoader />;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: lgDownBreakpoint ? theme.spacing(3, 3, 0, 3) : theme.spacing(0, 3), // add top padding so event video doesn't touch navbar
            }}
        >
            <ConditionalRender client>
                <React.Suspense fallback={<EventLiveLoader />}>
                    <PreloadedEventLiveModratorView eventId={router.query.id as string} />
                </React.Suspense>
            </ConditionalRender>
            <ConditionalRender server>
                <EventLiveLoader />
            </ConditionalRender>
        </div>
    );
};

export default Mod;
