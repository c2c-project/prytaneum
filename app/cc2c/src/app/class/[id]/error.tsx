'use client';

import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { AppBar } from '@local/components';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <React.Fragment>
            <AppBar />
            <Grid container justifyContent='center'>
                <Grid container direction='column' alignContent='center'>
                    <Grid item container justifyContent='center'>
                        <Typography variant='h3' marginY='3rem'>
                            Something Went Wrong!
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent='center'>
                        <Typography>{error.message}</Typography>
                    </Grid>
                    <Grid item container justifyContent='center'>
                        <Button variant='contained' color='primary' onClick={() => reset()}>
                            Try Again
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
