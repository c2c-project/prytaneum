import React from 'react';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';

import { UploadFile } from '@local/components/UploadFile';
import { onAssignmentUpload } from './upload';
import { Class, getAllClasses } from './actions';
import { CreateClassForm } from '@local/components/CreateClassForm';

interface Props {}

export async function AdminDashboard({}: Props) {
    const classes = await getAllClasses();

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
                <CreateClassForm />
                <List>
                    {classes.map((_class) => (
                        <ListItem key={_class.id}>
                            <Typography>{_class.name}</Typography>
                            <Typography>{' | '}</Typography>
                            <Typography>{_class.termId}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}
