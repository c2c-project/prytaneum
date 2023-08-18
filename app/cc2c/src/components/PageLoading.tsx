'use client';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export function PageLoading() {
    return (
        <Grid container justifyContent='center'>
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        </Grid>
    );
}
