import { Loader } from '@local/components';
import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';

function PreloadedAdminDashboard() {
    return <div>Admin Dashboard</div>;
}

export function AdminDashboard() {
    return (
        <Paper>
            <Grid container>
                <Grid item paddingLeft='1rem'>
                    <Typography variant='h4'>Admin Dashboard</Typography>
                </Grid>
                <React.Suspense fallback={<Loader />}>
                    <PreloadedAdminDashboard />
                </React.Suspense>
            </Grid>
        </Paper>
    );
}
