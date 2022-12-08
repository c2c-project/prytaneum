import { Button, TextField } from '@mui/material';
import * as Yup from 'yup';

import { Form } from '@local/components';
import { useForm } from '@local/core';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';

export type TModeratorForm = { email: string };

export interface ModeratorProps {
    form?: TModeratorForm;
    onSubmit: (submittedForm: TModeratorForm) => void;
}

type TSchema = {
    [key in keyof TModeratorForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
});

const initialState: TModeratorForm = { email: '' };

export function ModeratorForm(props: ModeratorProps) {
    const { onSubmit, form } = props;

    const [state, errors, handleSubmit, handleChange] = useForm<TModeratorForm>(form || initialState, validationSchema);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Moderator Form' />
            <FormContent>
                <TextField
                    onChange={handleChange('email')}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    value={state.email}
                    label='Email'
                    name='email'
                    type='email'
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
