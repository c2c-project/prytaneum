'use client';

import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

import { AppBar } from '@local/components';

export default function Loading() {
    return (
        <React.Fragment>
            <AppBar />
            <Grid container direction='column' minHeight='80vh' justifyContent='center' alignItems='center'>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
