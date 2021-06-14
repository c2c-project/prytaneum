import { useMemo } from 'react';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
import { useForm } from '@local/hooks';

export type TModeratorForm = { email: string };
export interface ModeratorProps {
    form?: TModeratorForm;
    onSubmit?: (submittedForm: TModeratorForm) => void;
}
const initialState: TModeratorForm = { email: '' };
export function ModeratorForm({ form, onSubmit }: ModeratorProps) {
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
            <FormTitle title='Moderator Form' />
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
