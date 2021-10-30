import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import type { CreateMember } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';
import { makeInitialState } from '@local/utils/ts-utils';

export type TMemberForm = Pick<CreateMember, 'email'>;

export interface MemberFormProps {
    onSubmit: (submittedForm: TMemberForm) => void;
    form?: TMemberForm;
}

type TSchema = {
    [key in keyof TMemberForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    email: Yup.string().required('Please enter an email'),
});

const initialState: TMemberForm = { email: '' };

export function MemberForm(props: MemberFormProps) {
    const { onSubmit, form } = props;

    const { handleSubmit, handleChange, values, errors } = useFormik<TMemberForm>({
        initialValues: makeInitialState(initialState, form),
        validationSchema,
        onSubmit,
    });

    return (
        <Form onSubmit={handleSubmit}>
            <FormTitle title='Member Form' />
            <FormContent>
                <TextField
                    autoFocus
                    required
                    label='Member Email'
                    value={values.email}
                    onChange={handleChange('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Invite
                </Button>
            </FormActions>
        </Form>
    );
}
