'use client';

import React from 'react';
import { Grid, Box, Modal, TextField, Button, Typography } from '@mui/material';
import { addTeacherByEmail } from './actions';

interface AddTeacherFormProps {
    classId: string;
}

export function AddTeacherFormModal({ classId }: AddTeacherFormProps) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string>('');

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const { isError, message } = await addTeacherByEmail(formData);
        if (isError) setError(message);
        else setModalVisible(false);
        setIsLoading(false);
    }

    React.useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    return (
        <React.Fragment>
            <Grid container justifyContent='center'>
                <Button variant='contained' onClick={() => setModalVisible(true)}>
                    Add Teacher
                </Button>
            </Grid>
            <Modal open={modalVisible}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        padding: '2rem',
                    }}
                >
                    <Typography variant='h3'>Add Teacher</Typography>
                    <Grid container direction='column' alignContent='center'>
                        <form action={handleSubmit}>
                            <TextField label='email' type='email' name='email' />
                            <input type='hidden' name='classId' value={classId} />
                            <div style={{ height: '1rem' }} />
                            <Grid item>
                                <Button variant='contained' onClick={() => setModalVisible(false)}>
                                    Cancel
                                </Button>
                                <Button disabled={isLoading} variant='contained' type='submit'>
                                    Add Teacher
                                </Button>
                            </Grid>
                            <Grid item>
                                {error !== '' && (
                                    <Typography variant='body1' color='red'>
                                        {error}
                                    </Typography>
                                )}
                            </Grid>
                        </form>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
