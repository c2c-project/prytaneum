import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions, UserWithToken } from '@local/app/api/auth/[...nextauth]/route';

import { getStudentWritingStatus } from './actions';
import { SubmitPostWritng, SubmitPreWritng } from '@local/components/student';

interface Props {}

export async function StudentDashboard({}: Props) {
    const session = await getServerSession(authOptions);
    if (!session) return <div>loading...</div>;
    const user = session.user as UserWithToken;

    const { preWritingSubmitted, postWritingSubmitted, classId } = await getStudentWritingStatus(user.id);

    return (
        <Grid container justifyContent='center'>
            <Grid item>
                <Typography variant='h3' marginY='3rem'>
                    Connecting Classrooms to Congress
                </Typography>
            </Grid>
            <Grid item container justifyContent='center'>
                <Grid item container direction='column' alignItems='center'>
                    <Typography>Event Info</Typography>
                    <Button>Join Town Hall</Button>
                </Grid>
            </Grid>
            {/* TODO: Add indicators for pre/post writing status & disable button if already submitted*/}
            <Grid item container justifyContent='center'>
                <SubmitPreWritng userId={user.id} classId={classId} preWritingSubmitted={preWritingSubmitted} />
                <SubmitPostWritng userId={user.id} classId={classId} postWritingSubmitted={postWritingSubmitted} />
            </Grid>
        </Grid>
    );
}
