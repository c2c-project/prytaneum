import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { makeInitialState } from '@local/utils/ts-utils';

export type TInviteForm = { email: string };

export interface InviteProps {
    form?: TInviteForm;
    onSubmit: (submittedForm: TInviteForm) => void;
}

type TSchema = {
    [key in keyof TInviteForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    email: Yup.string().required('Please enter an email'),
});

const initialState: TInviteForm = { email: '' };

export function InviteForm(props: InviteProps) {
    const { onSubmit, form } = props;

    const { handleSubmit, handleChange, values, errors } = useFormik<TInviteForm>({
        initialValues: makeInitialState(initialState, form),
        validationSchema,
        onSubmit,
    });

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle title='Invite Form' />
            <FormContent>
                <TextField
                    onChange={handleChange('email')}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    value={values.email}
                    label='Email'
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
