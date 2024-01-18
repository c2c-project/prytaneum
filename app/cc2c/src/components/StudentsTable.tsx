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
import PersonIcon from '@mui/icons-material/Person';
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CsvDownloader from 'react-csv-downloader';

import { ResponsiveDialog, useResponsiveDialog } from './ResponsiveDialog';
import { updateStudentData, sendRegistrationEmails } from '@local/server';
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
    termId: string;
    isTeacher: boolean;
}

export function StudentsTable({ students, classId, termId, isTeacher }: StudentsTableProps) {
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

    const studentWritingColumns = [
        { id: 'sid', displayName: 'Student ID' },
        { id: 'pre', displayName: 'Pre Writing' },
        { id: 'post', displayName: 'Post Writing' },
    ];

    const studentWritingColumnsForTeacher = [
        { id: 'sid', displayName: 'Student ID' },
        { id: 'email', displayName: 'Email' },
        { id: 'pre', displayName: 'Pre Writing' },
        { id: 'post', displayName: 'Post Writing' },
    ];

    const getStudentWritings = (student: Student) => {
        if (isTeacher)
            return Promise.resolve([
                {
                    sid: student.user.studentId,
                    email: student.user.email,
                    pre: student.preWriting,
                    post: student.postWriting,
                },
            ]);
        return Promise.resolve([
            {
                sid: student.user.studentId,
                pre: student.preWriting,
                post: student.postWriting,
            },
        ]);
    };

    const getAllWritings = () => {
        if (isTeacher)
            return Promise.resolve(
                students.map((student) => {
                    return {
                        sid: student.user.studentId,
                        email: student.user.email,
                        pre: student.preWriting,
                        post: student.postWriting,
                    };
                })
            );
        return Promise.resolve(
            students.map((student) => {
                return {
                    sid: student.user.studentId,
                    pre: student.preWriting,
                    post: student.postWriting,
                };
            })
        );
    };

    const handleDownloadAllWritingsText = () => {
        setIsLoading(true);
        let fileContent = 'data:text;charset=utf-8,';
        if (isTeacher) {
            students.forEach((student) => {
                fileContent += `Email: ${student.user.email}\nStudent ID: ${student.user.studentId}\nPRE WRITING:\n${student.preWriting}\nPOST WRITING:\n${student.postWriting}\n=============\n`;
            });
        } else {
            students.forEach((student) => {
                fileContent += `Student ID: ${student.user.studentId}\nPRE WRITING:\n${student.preWriting}\nPOST WRITING:\n${student.postWriting}\n=============\n`;
            });
        }
        const encodedUri = encodeURI(fileContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Class_${termId}_Writings.txt`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
    };

    const handleSendRegistrationEmails = () => async () => {
        setIsLoading(true);
        const unregisteredStudents = students
            .filter((student) => student.user.shadowAccount)
            .map((student) => ({
                id: student.userId,
                studentId: student.user.studentId,
                email: student.user.email,
                firstName: student.user.firstName,
            }));

        const formData = new FormData();
        formData.append('classId', classId);
        formData.append('unregisteredStudents', JSON.stringify(unregisteredStudents));
        const { isError, message } = await sendRegistrationEmails(formData);
        if (isError) {
            displaySnack(message, { variant: 'error' });
        }
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
                                        <Tooltip title='Not Registered'>
                                            <PersonIcon color='warning' />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Registered'>
                                            <HowToRegIcon color='success' />
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
                                            <PendingOutlinedIcon color='warning' />
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
                                            <PendingOutlinedIcon color='warning' />
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
                                    <CsvDownloader
                                        filename={`Student_${student.user.studentId}_Writings`}
                                        extension='.csv'
                                        separator='|'
                                        wrapColumnChar='"'
                                        columns={isTeacher ? studentWritingColumnsForTeacher : studentWritingColumns}
                                        datas={getStudentWritings(student)}
                                    >
                                        <IconButton disabled={isLoading} aria-label='download'>
                                            <DownloadIcon />
                                        </IconButton>
                                    </CsvDownloader>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent='center' paddingTop={2} paddingBottom={2}>
                <Button disabled={isLoading} variant='outlined' onClick={handleSendRegistrationEmails()}>
                    Send Registration Emails
                </Button>
            </Grid>
            <Grid container justifyContent='center' paddingTop={2} paddingBottom={2}>
                <Button disabled={isLoading} variant='outlined' onClick={handleDownloadAllWritingsText}>
                    Download All Writings Text
                </Button>
                <CsvDownloader
                    filename={`Class_${termId}_Writings`}
                    extension='.csv'
                    separator='|'
                    wrapColumnChar='"'
                    columns={isTeacher ? studentWritingColumnsForTeacher : studentWritingColumns}
                    datas={getAllWritings}
                >
                    <Button disabled={isLoading} variant='outlined'>
                        Download All Writings CSV
                    </Button>
                </CsvDownloader>
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
