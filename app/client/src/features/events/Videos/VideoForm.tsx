import * as React from 'react';
import { Button, TextField } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/features/core';
import { FormTitle } from '@local/components/FormTitle';

export type TVideoForm = { url: string; lang: string };
interface VideoFormProps {
    onSubmit: (form: TVideoForm) => void;
    form?: TVideoForm;
}

export const VideoForm = ({ form = { url: '', lang: '' }, onSubmit }: VideoFormProps) => {
    const [state, errors, handleSubmit, handleChange] = useForm(form);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Video Form' />
            <FormContent>
                <TextField
                    helperText={errors.lang}
                    value={state.lang}
                    label='Language'
                    onChange={handleChange('lang')}
                />
                <TextField helperText={errors.url} value={state.url} label='Video URL' onChange={handleChange('url')} />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
};
