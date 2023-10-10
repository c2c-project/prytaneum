'use client';

import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Avatar,
    Typography,
    Grid,
    DialogContent,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import { ResponsiveDialog, useResponsiveDialog } from './ResponsiveDialog';
import { updateStudentData } from '@local/server';
import { useSnack } from '@local/lib';

export interface StudentsListProps {
    students: {
        userId: string;
        preWriting: string;
        postWriting: string;
        user: {
            studentId: string;
            email: string;
            firstName: string;
            lastName: string;
            researchProjectConsent: boolean;
            shadowAccount: boolean;
        };
    }[];
    classId: string;
}

export function StudentsList({ students, classId }: StudentsListProps) {
    const [selectedStudent, setSelectedStudent] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, open, close] = useResponsiveDialog();
    const [resetPreWritingChecked, setResetPreWritingChecked] = React.useState(false);
    const [resetPostWritingChecked, setResetPostWritingChecked] = React.useState(false);
    const { displaySnack } = useSnack();

    const handleResetPreWritingCheckedChange = () => {
        setResetPreWritingChecked(!resetPreWritingChecked);
    };

    const handleResetPostWritingCheckedChange = () => {
        setResetPostWritingChecked(!resetPostWritingChecked);
    };

    const handleSelectStudent = (studentId: string) => () => {
        setSelectedStudent(studentId);
        open();
    };

    const handleEditStudent = async (formData: FormData) => {
        setIsLoading(true);
        const { isError, message } = await updateStudentData(formData, resetPreWritingChecked, resetPostWritingChecked);
        if (isError) {
            displaySnack(message, { variant: 'error' });
        } else {
            displaySnack('Student Updated', { variant: 'success' });
        }
        setResetPostWritingChecked(false);
        setResetPreWritingChecked(false);
        setSelectedStudent('');
        close();
        setIsLoading(false);
    };

    const handleDialogClose = () => {
        setSelectedStudent('');
        setResetPreWritingChecked(false);
        setResetPostWritingChecked(false);
        close();
    };

    return (
        <React.Fragment>
            <List>
                {students.map((student) => (
                    <ListItem key={student.userId}>
                        <ListItemButton onClick={handleSelectStudent(student.userId)}>
                            <Avatar>{student.user.firstName[0]}</Avatar>
                            <div style={{ width: '1rem' }} />
                            <ListItemText primary={student.user.firstName + ' ' + student.user.lastName} />
                            <div style={{ width: '1rem' }} />
                            <Typography variant='body1' fontWeight='bold' paddingRight='1rem'>
                                Pre:
                            </Typography>
                            <ListItemText primary={student.preWriting === '' ? <PendingIcon /> : <DoneIcon />} />
                            <div style={{ width: '1rem' }} />
                            <Typography variant='body1' fontWeight='bold' paddingRight='1rem'>
                                Post:
                            </Typography>
                            <ListItemText primary={student.postWriting === '' ? <PendingIcon /> : <DoneIcon />} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <ResponsiveDialog open={isOpen} onClose={handleDialogClose} fullWidth>
                <DialogContent>
                    <form action={handleEditStudent}>
                        <Typography variant='h4' align='center'>
                            Edit Student
                        </Typography>
                        <input type='hidden' name='studentId' value={selectedStudent} />
                        <input type='hidden' name='classId' value={classId} />
                        <Grid container width='100%' direction='column' alignItems='center' spacing={2}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={resetPreWritingChecked}
                                            onChange={handleResetPreWritingCheckedChange}
                                        />
                                    }
                                    label='Reset Pre-Writing'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={resetPostWritingChecked}
                                            onChange={handleResetPostWritingCheckedChange}
                                        />
                                    }
                                    label='Reset Post-Writing'
                                />
                            </FormGroup>
                        </Grid>
                        <Grid container paddingTop='1rem' justifyContent='flex-end'>
                            <Button color='secondary' onClick={close}>
                                Cancel
                            </Button>
                            <Button disabled={isLoading} type='submit' variant='contained' color='primary'>
                                Update
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </ResponsiveDialog>
        </React.Fragment>
    );
}
