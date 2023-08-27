import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { UploadRoster } from '@local/components';

interface Props {}

export function TeacherDashboard({}: Props) {
    return (
        <Grid container justifyContent='center'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Town Hall with your member of Congress
                </Typography>
            </Grid>
            <Grid item container justifyContent='center'>
                <Grid item container direction='column' alignItems='center'>
                    <Typography>Event Info</Typography>
                    <Button>Join Event</Button>
                </Grid>
            </Grid>
            <Grid item container justifyContent='center'>
                <UploadRoster />
            </Grid>
        </Grid>
    );
}
