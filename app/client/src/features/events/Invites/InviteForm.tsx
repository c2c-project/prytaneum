import { useMemo } from 'react';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/features/core';

export type TInviteForm = { email: string };
export interface InviteProps {
    form?: TInviteForm;
    onSubmit?: (submittedForm: TInviteForm) => void;
}
const initialState: TInviteForm = { email: '' };
export function InviteForm({ form, onSubmit }: InviteProps) {
    const [state, errors, buildHandleSubmit, buildHandleChange] = useForm(
        form || initialState,
        useMemo(
            () =>
                Yup.object().shape({
                    email: Yup.string().email().required(),
                }),
            []
        )
    );
    return (
        <Form onSubmit={buildHandleSubmit(onSubmit)}>
            <FormTitle title='Invite Form' />
            <FormContent>
                <TextField
                    onChange={buildHandleChange('email')}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    value={state.email}
                    label='Email'
                    type='email'
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}
