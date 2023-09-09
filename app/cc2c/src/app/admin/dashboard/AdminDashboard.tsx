import React from 'react';
import Link from 'next/link';
import { Button, Grid, Typography } from '@mui/material';

import { UploadRoster } from '@local/components';

export async function AdminDashboard() {
    return (
        <Grid container justifyContent='center'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Admin Dashboard
                </Typography>
            </Grid>
            <Grid item container justifyContent='center'>
                <UploadRoster />
                <div style={{ width: '2rem' }} />
                <Link style={{ textDecoration: 'none' }} href='/class/create'>
                    <Button variant='contained' color='primary'>
                        Create Class
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}
