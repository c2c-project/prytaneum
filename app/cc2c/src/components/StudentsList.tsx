'use client';

import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, Avatar } from '@mui/material';

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
}

export function StudentsList({ students }: StudentsListProps) {
    const handleSelectStudent = (studentId: string) => () => {
        console.log('handleSelectStudent', studentId);
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
                            <ListItemText primary={student.preWriting === '' ? 'PRE: X' : 'PRE: O'} />
                            <div style={{ width: '1rem' }} />
                            <ListItemText primary={student.postWriting === '' ? 'POST: X' : 'POST: O'} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}
