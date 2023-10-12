'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Typography,
    Grid,
    DialogContent,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

import { ResponsiveDialog, useResponsiveDialog } from './ResponsiveDialog';
import { updateStudentData } from '@local/server';
import { useSnack } from '@local/lib';

type Student = {
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
};

export interface StudentsTableProps {
    students: Student[];
    classId: string;
}

export function StudentsTable({ students, classId }: StudentsTableProps) {
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

    const handleDownloadWritings = (student: Student) => () => {
        setIsLoading(true);
        // const student = students.find((student) => student.userId === selectedStudent);
        if (!student) {
            displaySnack('Student not found', { variant: 'error' });
            setIsLoading(false);
            return;
        }
        if (student.preWriting === '' && student.postWriting === '') {
            displaySnack('No writings to download', { variant: 'warning' });
            setIsLoading(false);
            return;
        }
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            'Email,preWriting,postWriting\n' +
            `${student?.user.email},${student?.preWriting},${student?.postWriting}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${student.user.email}_writings.csv`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
    };

    const handleDownloadAllWritings = () => {
        setIsLoading(true);
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            'Email,preWriting,postWriting\n' +
            students
                .map((student) => `${student?.user.email},${student?.preWriting},${student?.postWriting}`)
                .join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `students_writings.csv`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label='Students Table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Reg Status</TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Pre-Writing Status</TableCell>
                            <TableCell align='center'>Post-Writing Status</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                            <TableCell align='center'>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.userId}>
                                <TableCell align='center'>
                                    {student.user.shadowAccount ? (
                                        <Tooltip title='Registered'>
                                            <HowToRegIcon color='success' />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Not Registered'>
                                            <PendingOutlinedIcon />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell align='center'>
                                    {student.user.firstName} {student.user.lastName}
                                </TableCell>
                                <TableCell align='center'>{student.user.email}</TableCell>
                                <TableCell align='center'>
                                    {student.preWriting === '' ? (
                                        <Tooltip title='Not Submitted'>
                                            <PendingOutlinedIcon />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Submitted'>
                                            <DoneIcon color='success' />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell align='center'>
                                    {student.postWriting === '' ? (
                                        <Tooltip title='Not Submitted'>
                                            <PendingOutlinedIcon />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Submitted'>
                                            <DoneIcon color='success' />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        variant='contained'
                                        disabled={isLoading}
                                        onClick={handleSelectStudent(student.userId)}
                                        aria-label='edit'
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton
                                        disabled={isLoading}
                                        onClick={handleDownloadWritings(student)}
                                        aria-label='download'
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent='center' paddingTop={2} paddingBottom={2}>
                <Button disabled={isLoading} variant='outlined' onClick={handleDownloadAllWritings}>
                    Download All Writings
                </Button>
            </Grid>
            <ResponsiveDialog open={isOpen} onClose={handleDialogClose} fullWidth>
                <DialogContent>
                    <form action={handleEditStudent}>
                        <Typography variant='h4' align='center' paddingBottom={2}>
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
