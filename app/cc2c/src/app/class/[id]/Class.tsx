import React from 'react';
import { Grid, Box, Divider, Typography, Button, Link } from '@mui/material';

import { getClassById, getStudentsByClassId, getTeacherUrl } from '@local/server';
import { EditClassDialog, StudentsTable, AddTeacherFormModal } from '@local/components';
import type { UserWithoutPass } from '@local/app/api/auth/types';

interface ClassProps {
    classId: string;
    user: UserWithoutPass;
}

export async function Class({ classId, user }: ClassProps) {
    const _class = await getClassById(classId);
    const students = await getStudentsByClassId(classId);
    const teacherUrl = await getTeacherUrl(classId, user);

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
            {user.role === 'TEACHER' && (
                <Grid item container justifyContent='center'>
                    <Link href={teacherUrl} style={{ textDecoration: 'none' }}>
                        <Button variant='contained'>View Event</Button>
                    </Link>
                </Grid>
            )}
            {user.role === 'ADMIN' && (
                <Link href={_class.prytaneumURL} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>View Event</Button>
                </Link>
            )}
            {user.role === 'ADMIN' && (
                <React.Fragment>
                    <div style={{ width: '1rem' }} />
                    <EditClassDialog
                        classId={classId}
                        defaultValues={{
                            className: _class.name,
                            termId: _class.termId,
                            prytaneumURL: _class.prytaneumURL,
                        }}
                    />
                    <div style={{ width: '1rem' }} />
                    <AddTeacherFormModal classId={classId} />
                </React.Fragment>
            )}
            <Divider />
            <Grid item container justifyContent='center'>
                <Typography variant='h4'>Students</Typography>
            </Grid>
            <Box>
                <StudentsTable
                    students={students}
                    classId={classId}
                    termId={_class.termId}
                    isTeacher={user.role === 'TEACHER'}
                />
            </Box>
        </Grid>
    );
}
