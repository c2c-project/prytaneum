import * as React from 'react';
import { Button } from '@material-ui/core';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks/useForm';
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
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
};
