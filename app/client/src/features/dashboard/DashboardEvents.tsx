import * as React from 'react';
import { FragmentRefs } from 'relay-runtime';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { DashboardEventListDisplay } from './DashboardEventListDisplay';

interface DashboardEventsProps {
    fragmentRef: {
        readonly ' $fragmentSpreads': FragmentRefs<any>;
    };
}

export function DashboardEvents({ fragmentRef }: DashboardEventsProps) {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid container width={lgUpBreakpoint ? '80%' : '100%'} marginLeft={lgUpBreakpoint ? '250px' : '0px'}>
            <DashboardEventListDisplay fragmentRef={fragmentRef} ongoing={true} />
            <DashboardEventListDisplay fragmentRef={fragmentRef} ongoing={false} />
        </Grid>
    );
}
