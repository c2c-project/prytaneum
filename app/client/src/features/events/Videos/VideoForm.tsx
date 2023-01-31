import * as React from 'react';
import * as Yup from 'yup';
import { Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';

import { Form } from '@local/components';
import { useForm } from '@local/core';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { FormTitle } from '@local/components/FormTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type TVideoForm = { url: string; lang: string };

type TSchema = {
    [key in keyof TVideoForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    lang: Yup.string().required('Please enter a language'),
    url: Yup.string().url('Please enter a valid URL').required('Please enter a video URL'),
});
interface VideoFormProps {
    onSubmit: (form: TVideoForm) => void;
    form?: TVideoForm;
}

const initialState: TVideoForm = { url: '', lang: 'en' };

export const VideoForm = (props: VideoFormProps) => {
    const { onSubmit, form } = props;

    const [state, errors, handleSubmit, handleChange, setState] = useForm<TVideoForm>(
        form || initialState,
        validationSchema
    );

    const handleSelectionChange = (e: SelectChangeEvent) => {
        const { value } = e.target;
        setState({ ...state, lang: value });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Video Form' />
            <FormControl fullWidth>
                <InputLabel id='lang-label'>Language</InputLabel>
                <Select
                    labelId='lang-label'
                    id='lang'
                    label='Language'
                    name='lang'
                    value={state.lang}
                    onChange={handleSelectionChange}
                >
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='sp'>Spanish</MenuItem>
                </Select>
            </FormControl>
            <FormContent>
                <TextField
                    required
                    helperText={errors.url}
                    value={state.url}
                    label='Video URL'
                    name='url'
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
