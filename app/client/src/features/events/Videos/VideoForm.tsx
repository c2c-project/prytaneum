import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { FormTitle } from '@local/components/FormTitle';
import { makeInitialState } from '@local/utils/ts-utils';

export type TVideoForm = { url: string; lang: string };

type TSchema = {
    [key in keyof TVideoForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    lang: Yup.string().required('Please enter a language'),
    url: Yup.string().required('Please enter a video URL'),
});
interface VideoFormProps {
    onSubmit: (form: TVideoForm) => void;
    form?: TVideoForm;
}

const initialState: TVideoForm = { url: '', lang: '' };

export const VideoForm = (props: VideoFormProps) => {
    const { onSubmit, form } = props;

    const { handleSubmit, handleChange, values, errors } = useFormik<TVideoForm>({
        initialValues: makeInitialState(initialState, form),
        validationSchema,
        onSubmit,
    });

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle title='Video Form' />
            <FormContent>
                <TextField
                    required
                    helperText={errors.lang}
                    value={values.lang}
                    label='Language'
                    onChange={handleChange('lang')}
                    error={Boolean(errors.lang)}
                />
                <TextField
                    required
                    helperText={errors.url}
                    value={values.url}
                    label='Video URL'
                    onChange={handleChange('url')}
                    error={Boolean(errors.url)}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
};
