import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputAdornment, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Form from 'components/Form';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import TextField from 'components/TextField';
import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import history from 'utils/history';
import useForm from 'hooks/useForm';
import useUser from 'hooks/useUser';

import API from '../api';

const useStyles = makeStyles((theme) => ({
    link: {
        padding: theme.spacing(2, 0, 0, 2),
    },
}));

interface Props {
    onSuccess?: () => void;
}

interface SignInForm {
    email: string;
    password: string;
}

const intialState: SignInForm = { email: '', password: '' };
/** Function to request a password reset, calls onSuccess if worked, otherwise, calls onFailure
 * @category Domains/Auth
 * @constructor ForgotPassRequest
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export default function LoginForm({ onSuccess }: Props) {
    const classes = useStyles();
    const [, setUser] = useUser();
    const [form, errors, handleSubmit, handleChange] = useForm(intialState);
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const apiRequest = React.useCallback(() => API.login(form.email, form.password), [form]);
    const [sendRequest, isLoading] = useEndpoint(apiRequest, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            if (onSuccess) onSuccess();
        },
    });

    return (
        <Form onSubmit={handleSubmit(sendRequest)}>
            <FormContent>
                <TextField
                    id='login-email'
                    required
                    type='email'
                    value={form.email}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    onChange={handleChange('email')}
                    label='Email'
                    autoFocus
                />
                <>
                    <TextField
                        id='login-password'
                        required
                        error={Boolean(errors.password)}
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        helperText={errors.password}
                        label='Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.password ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.password ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link className={classes.link} color='primary' href='/forgot-password/request'>
                        Forgot Password?
                    </Link>
                </>
            </FormContent>
            <FormActions>
                <Button fullWidth variant='outlined' onClick={() => history.push('/register')}>
                    Sign Up
                </Button>
                <LoadingButton loading={isLoading}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Login
                    </Button>
                </LoadingButton>
            </FormActions>
        </Form>
    );
}

LoginForm.defaultProps = {
    onSuccess: undefined,
};

LoginForm.propTypes = {
    onSuccess: PropTypes.func,
};
