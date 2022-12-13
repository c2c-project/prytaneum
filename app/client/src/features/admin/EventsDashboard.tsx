import { Loader } from '@local/components';
import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';

function PreloadedEventsList() {
    return <div>Events List</div>;
}

export function EventsDashboard() {
    return (
        <Paper>
            <Grid container>
                <Grid item paddingLeft='1rem'>
                    <Typography variant='h4'>Admin Dashboard: Events</Typography>
                </Grid>
                <React.Suspense fallback={<Loader />}>
                    <PreloadedEventsList />
                </React.Suspense>
            </Grid>
        </Paper>
    );
}
