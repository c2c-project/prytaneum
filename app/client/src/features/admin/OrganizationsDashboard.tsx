import { Loader } from '@local/components';
import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';

function PreloadedOrganizationsList() {
    return <div>Organizations List</div>;
}

export function OrganizationsDashboard() {
    return (
        <Paper>
            <Grid container>
                <Grid item paddingLeft='1rem'>
                    <Typography variant='h4'>Admin Dashboard: Organizations</Typography>
                </Grid>
                <React.Suspense fallback={<Loader />}>
                    <PreloadedOrganizationsList />
                </React.Suspense>
            </Grid>
        </Paper>
    );
}
