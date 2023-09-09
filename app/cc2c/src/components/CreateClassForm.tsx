'use client';

import React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useForm } from '@local/lib';
import { createClass } from '@local/app/dashboard/actions';

type ClassFormState = {
    name: string;
    termId: string;
    prytaneumURL: string;
};

export function CreateClassForm() {
    const initialState = { name: '', termId: '', prytaneumURL: '' };
    const [form, , , handleChange] = useForm<ClassFormState>(initialState);
    return (
        <Grid container component='form' action={createClass} justifyContent='center' height='80vh'>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item paddingY={3}>
                    <Typography variant='h4'>Create Class</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        autoComplete='off'
                        type='text'
                        id='name'
                        name='name'
                        value={form.name}
                        onChange={handleChange('name')}
                        label='Class Name'
                    />
                    <TextField
                        required
                        autoComplete='off'
                        type='text'
                        id='termId'
                        name='termId'
                        value={form.termId}
                        onChange={handleChange('termId')}
                        label='Term Id'
                    />
                    <TextField
                        autoComplete='off'
                        type='text'
                        id='prytaneumURL'
                        name='prytaneumURL'
                        value={form.prytaneumURL}
                        onChange={handleChange('prytaneumURL')}
                        label='Prytaneum URL'
                    />
                </Grid>
                <Grid item paddingTop={3}>
                    <Button type='submit' variant='contained' color='primary'>
                        Create Class
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
