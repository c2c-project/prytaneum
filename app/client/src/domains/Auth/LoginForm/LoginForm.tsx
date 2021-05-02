import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, InputAdornment, IconButton, Link as MUILink, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { TextField } from '@local/components/TextField';
// import useEndpoint from '@local/hooks/useEndpoint';
import { LoadingButton } from '@local/components/LoadingButton';
import { useForm } from '@local/hooks/useForm';
// import useUser from '@local/hooks/useUser';

// import API from '../api';

const useStyles = makeStyles((theme) => ({
    link: {
        padding: theme.spacing(0.5, 0, 0, 0),
    },
    buttonGroup: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
    divider: {
        maxWidth: '75%',
        marginLeft: '12.5%',
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
 * @category @local/domains/Auth
 * @constructor ForgotPassRequest
 * @param props
 * @param {"() => void"} onSuccess function to call if successful
 * @param {"() => void"} onFailure function to call if failed
 * @example
 * const onS = () => {};
 * const onF = () => {};
 * <ForgotPassRequest onSuccess={onS} onFailure={onF}/>
 */
export function LoginForm({ onSuccess }: Props) {
    const classes = useStyles();
    const router = useRouter();
    // const [, setUser] = useUser();
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, handleSubmit, handleChange] = useForm(intialState);
    // const apiRequest = React.useCallback(() => API.login(form.email, form.password), [form]);
    // const [sendRequest, isLoading] = useEndpoint(apiRequest, {
    //     onSuccess: ({ data }) => {
    //         setUser(data.user);
    //         if (onSuccess) onSuccess();
    //     },
    // });

    return (
        <Form onSubmit={handleSubmit(console.log)}>
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
                    <Grid container justify='flex-end'>
                        <MUILink
                            component={Link}
                            className={classes.link}
                            color='primary'
                            href='/forgot-password'
                        >
                            Forgot Password?
                        </MUILink>
                    </Grid>
                </>
            </FormContent>
            <Grid container item direction='column' className={classes.buttonGroup}>
                <LoadingButton loading={false}>
                    <Button fullWidth type='submit' variant='contained' color='primary'>
                        Login
                    </Button>
                </LoadingButton>
                <Divider className={classes.divider} />
                <Button fullWidth variant='outlined' onClick={() => router.push('/register')}>
                    Register
                </Button>
            </Grid>
        </Form>
    );
}

LoginForm.defaultProps = {
    onSuccess: undefined,
};

LoginForm.propTypes = {
    onSuccess: PropTypes.func,
};
