import { Button } from '@material-ui/core';

import { TextField } from '@local/components/TextField';
import { useForm } from '@local/features/core';
import type { CreateMember } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { FormActions } from '@local/components/FormActions';

export type TMemberForm = Pick<CreateMember, 'email'>;

export interface MemberFormProps {
    onSubmit: (submittedForm: TMemberForm) => void;
    form?: TMemberForm;
}

const initialState: TMemberForm = { email: '' };

export function MemberForm({ onSubmit, form: formProp }: MemberFormProps) {
    const [form, errors, handleSubmit, handleChange] = useForm(formProp ?? initialState);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Member Form' />
            <FormContent>
                <TextField
                    label='Member Email'
                    value={form.email}
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
