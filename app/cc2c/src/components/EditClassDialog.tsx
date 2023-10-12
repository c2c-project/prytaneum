'use client';

import React from 'react';
import { Button, DialogContent, Grid, TextField, Typography } from '@mui/material';

import { ResponsiveDialog, useResponsiveDialog } from './ResponsiveDialog';
import { updateClass } from '@local/server';
import { useSnack } from '@local/lib';

interface Props {
    classId: string;
    defaultValues: {
        className: string;
        termId: string;
        prytaneumURL: string;
    };
}

export function EditClassDialog({ classId, defaultValues }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [isLoading, setIsLoading] = React.useState(false);
    const { displaySnack } = useSnack();

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        const { isError, message } = await updateClass(formData);
        if (isError) {
            displaySnack(message, { variant: 'error' });
        } else {
            displaySnack(message, { variant: 'success' });
            close();
        }
        setIsLoading(false);
    };

    return (
        <React.Fragment>
            <Button variant='contained' onClick={open}>
                Edit Class
            </Button>
            <ResponsiveDialog open={isOpen} onClose={close} fullWidth>
                <DialogContent>
                    <form action={handleSubmit}>
                        <Typography variant='h4' align='center'>
                            Edit Class
                        </Typography>
                        <Grid container width='100%' direction='column' alignItems='center' spacing={2}>
                            <input type='hidden' name='classId' value={classId} />
                            <Grid item width='100%'>
                                <TextField
                                    fullWidth
                                    id='className'
                                    name='className'
                                    label='Class Name'
                                    defaultValue={defaultValues.className}
                                />
                            </Grid>
                            <Grid item width='100%'>
                                <TextField
                                    fullWidth
                                    id='termId'
                                    name='termId'
                                    label='Term ID'
                                    defaultValue={defaultValues.termId}
                                />
                            </Grid>
                            <Grid item width='100%'>
                                <TextField
                                    fullWidth
                                    id='prytaneumURL'
                                    name='prytaneumURL'
                                    label='prytaneum URL'
                                    defaultValue={defaultValues.prytaneumURL}
                                />
                            </Grid>
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
