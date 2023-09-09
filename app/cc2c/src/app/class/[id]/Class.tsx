import React from 'react';
import { Grid, Box, List, ListItem, ListItemText, ListItemButton, Divider, Typography, Avatar } from '@mui/material';

import { getClassById, getStudentsByClassId } from '@local/server';
import { StudentsList } from '@local/components';

// TODO: Add edit class button (To edit name)
export async function Class({ classId }: { classId: string }) {
    const _class = await getClassById(classId);
    const students = await getStudentsByClassId(classId);

    if (!_class)
        return (
            <Grid container justifyContent='center'>
                Class not found
            </Grid>
        );

    return (
        <Grid container justifyContent='center'>
            <Grid item container direction='column' alignContent='center'>
                <Typography variant='h3'>Class Info</Typography>
                <Typography variant='body1'>Class Name: {_class.name}</Typography>
                <Typography variant='body1'>Term ID: {_class.termId}</Typography>
            </Grid>
            <Divider />
            <Grid item container justifyContent='center'>
                <Typography variant='h4'>Students</Typography>
            </Grid>
            <Box sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
                <StudentsList students={students} />
            </Box>
        </Grid>
    );
}
