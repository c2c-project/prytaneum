import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import type { CreateMember } from '@local/graphql-types';

import { Form } from '@local/components';
import { useForm } from '@local/core';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';

export type TMemberForm = Pick<CreateMember, 'email'>;

export interface MemberFormProps {
    onSubmit: (submittedForm: TMemberForm) => void;
    form?: TMemberForm;
}

type TSchema = {
    [key in keyof TMemberForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
});

const initialState: TMemberForm = { email: '' };

export function MemberForm(props: MemberFormProps) {
    const { onSubmit, form } = props;

    const [state, errors, handleSubmit, handleChange] = useForm<TMemberForm>(form || initialState, validationSchema);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Member Form' />
            <FormContent>
                <TextField
                    autoFocus
                    required
                    type='email'
                    label='Member Email'
                    name='email'
                    value={state.email}
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
