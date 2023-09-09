'use client';

import React from 'react';
import { Button, DialogContent, Grid, TextField, Typography } from '@mui/material';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useSnack } from '@local/lib';
import { handlePreWritingSubmit } from './actions';

interface Props {
    userId: string;
    classId: string;
    preWritingSubmitted: boolean;
}

export function SubmitPreWritng({ userId, classId, preWritingSubmitted }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { displaySnack } = useSnack();
    const [isLoading, setIsLoading] = React.useState(false);
    const [submitted, setIsSubmitted] = React.useState(preWritingSubmitted);
    const [error, setError] = React.useState<string>('');

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const { isError, message } = await handlePreWritingSubmit(formData);
        if (isError) setError(message);
        else {
            setIsSubmitted(true);
            close();
            displaySnack('Pre Writing Submitted!');
        }
        setIsLoading(false);
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <form action={handleSubmit}>
                        <Typography variant='h4' align='center'>
                            Pre Writing
                        </Typography>
                        <Grid container width='100%' alignItems='center' alignContent='center'>
                            <TextField
                                fullWidth
                                id='preWriting'
                                name='preWriting'
                                label='preWriting'
                                autoFocus
                                required
                                multiline
                            />
                            <input type='hidden' name='userId' value={userId} />
                            <input type='hidden' name='classId' value={classId} />
                            <Grid container paddingTop='1rem' alignContent='flex-end'>
                                <Button disabled={isLoading} type='submit' variant='contained' color='primary'>
                                    Submit
                                </Button>
                                <Button color='primary' onClick={close}>
                                    Close
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {error !== '' && <Typography color='error'>{error}</Typography>}
                </DialogContent>
            </ResponsiveDialog>
            <Button disabled={submitted} variant='contained' color='primary' onClick={open}>
                Submit Pre Writing
            </Button>
        </>
    );
}
