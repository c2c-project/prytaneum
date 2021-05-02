import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import type { ForgotPassForm } from 'prytaneum-typings';

import TextField from 'components/TextField';
import Form from 'components/Form';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import useSnack from 'hooks/useSnack';
import useForm from 'hooks/useForm';

import API from '../api';

interface Props {
    token: string;
    onSuccess: () => void;
}
const initialState: ForgotPassForm = { password: '', confirmPassword: '' };
export default function PasswordResetForm({ token, onSuccess }: Props) {
    const [snack] = useSnack();
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const builtRequest = React.useCallback(
        () => API.forgotPassReset(token, form),
        [form, token]
    );
    const [sendRequest, isLoading] = useEndpoint(builtRequest, {
        onSuccess: () => {
            snack('Successfully reset password!');
            onSuccess();
        },
    });
    return (
        <Form onSubmit={handleSubmit(sendRequest)}>
            <FormContent>
                <TextField
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required
                    type='password'
                    value={form.password}
                    onChange={handleChange('password')}
                    label='Password'
                />
                <TextField
                    required
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    type='password'
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    label='Confirm Password'
                />
            </FormContent>
            <FormActions>
                <LoadingButton loading={isLoading}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                    >
                        Submit
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

PasswordResetForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};
