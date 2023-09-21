import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { UploadRoster } from '@local/components';
import Link from 'next/link';

interface Props {
    classId: string;
}

export function TeacherDashboard({ classId }: Props) {
    return (
        <Grid container direction='column' alignItems='center' justifyContent='center' spacing='2rem'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Town Hall with your member of Congress
                </Typography>
            </Grid>
            <Grid item>
                {classId !== '' && (
                    <Link style={{ textDecoration: 'none' }} href={`/class/${classId}`}>
                        <Button variant='contained'>View Class</Button>
                    </Link>
                )}
            </Grid>
            <Grid item>
                <UploadRoster />
            </Grid>
        </Grid>
    );
}
