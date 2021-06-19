import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    InputAdornment,
    IconButton,
    Link as MUILink,
    Grid,
    Divider,
    Avatar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import { useMutation, graphql } from 'react-relay';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { LoginFormMutation } from '@local/__generated__/LoginFormMutation.graphql';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { LoadingButton } from '@local/components/LoadingButton';
import { useForm, useUser, useSnack } from '@local/hooks';

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
}));

interface Props {
    onSuccess?: () => void;
    secondaryActions?: React.ReactNode;
}

interface TLoginForm {
    [index: string]: string;
    email: string;
    password: string;
}

const LOGIN_FORM_MUTATION = graphql`
    mutation LoginFormMutation($input: LoginForm!) {
        login(input: $input) {
            isError
            message
            body {
                ...useUserFragment
            }
        }
    }
`;

const intialState: TLoginForm = { email: '', password: '' };
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
export function LoginForm({ onSuccess, secondaryActions }: Props) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [, setUser] = useUser();
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, handleSubmit, handleChange] = useForm(intialState);
    const [commit, isLoading] = useMutation<LoginFormMutation>(LOGIN_FORM_MUTATION);

    const commitMutation = (submittedForm: TLoginForm) => {
        commit({
            variables: {
                input: submittedForm,
            },
            onCompleted({ login }) {
                if (login.isError) snack(login.message);
                else {
                    setUser(login.body);
                    if (onSuccess) onSuccess();
                }
            },
        });
    };

    return (
        <Grid container justify='center'>
            <Grid item container xs={12} direction='column' alignItems='center'>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit(commitMutation)}>
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
                            <Link href='/forgot-password' passHref>
                                <MUILink className={classes.link} color='primary'>
                                    Forgot Password?
                                </MUILink>
                            </Link>
                        </Grid>
                    </>
                </FormContent>
                <Grid container item direction='column' className={classes.buttonGroup}>
                    <LoadingButton loading={isLoading}>
                        <Button fullWidth type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </LoadingButton>
                    {secondaryActions && (
                        <>
                            <Divider className={classes.divider} />
                            {secondaryActions}
                        </>
                    )}
                </Grid>
            </Form>
        </Grid>
    );
}

LoginForm.defaultProps = {
    onSuccess: undefined,
};

LoginForm.propTypes = {
    onSuccess: PropTypes.func,
};
