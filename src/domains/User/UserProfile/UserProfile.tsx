import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import type { RegisterForm } from 'prytaneum-typings';

import Form from 'components/Form';
import TextField from 'components/TextField';
import EditableText from 'components/EditableText';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';
import Redirect from 'domains/Logical/Redirect';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import useUser from 'hooks/useUser';
import useForm from 'hooks/useForm';

import API from '../../Auth/api';
import FormContent from 'components/FormContent';

interface Props {
    // eslint-disable-next-line react/require-default-props
    img?: string;
    // safeUser?: ClientSafeUser;
    // forceNoLogin?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 1, 1, 1),
        height: '100%',
        width: '100%',
    },
}));


export default function UserProfile({ img }: Props) {
    const classes = useStyles();
    const [user, setUser] = useUser();
    const initState: RegisterForm = { firstName: user?.name.first || "", lastName: user?.name.last || "", email: user?.email.address || "", password: '', confirmPassword: '' };
    const [snack] = useSnack();
    const [regForm, errors, handleSubmit, handleChange] = useForm(initState);
    const fname = (user?.name.first || 'first')
    const lname = (user?.name.last || 'last')
    const changeFN = React.useCallback(() => API.changeName(fname, 'first'), [fname, 'first']);
    const [sendFName, isFNload] = useEndpoint(changeFN, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.name.first}!`);
        },
    });
    const changeLN = React.useCallback(() => API.changeName(lname, 'last'), [lname, 'last']);
    const [sendLName, isLNload] = useEndpoint(changeLN, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.name.last}!`);
        },
    });
    const changeEmail = React.useCallback(() => API.changeEmail(user?.email.address || "email"), [user?.email.address]);
    const [sendEmail, isEMload] = useEndpoint(changeEmail, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.email.address}!`);
        },
    });

    // check if user is logged in
    const isLoggedIn = user || undefined;
    if (isLoggedIn === undefined) {
        // if not, redirect to /login
        console.log('Redirecting');
        return <Redirect href='https://prytaneum.io/login' />;
    }

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        {/* ROUTING: to page to upload new photo */}
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    
                    <Grid component='span' item xs={12}>
                        <Form onSubmit={handleSubmit(sendFName)}>
                            <FormContent>
                                <TextField
                                    inputProps={{ 'aria-label': 'First Name' }}
                                    label='First Name'
                                    aria-label='First Name'
                                    id='fName'
                                    required
                                    type='text'
                                    placeholder='Your First Name Here'
                                    value={regForm.firstName}
                                    onChange={handleChange("firstName")}
                                />
                            </FormContent>
                        </Form>
                    </Grid>
                    
                    <Grid component='span' item xs={12}>
                        <Form onSubmit={handleSubmit(sendLName)}>
                            <FormContent>
                                <TextField
                                    inputProps={{ 'aria-label': 'Last Name' }}
                                    label='Last Name'
                                    aria-label='Last Name'
                                    id='fName'
                                    required
                                    type='text'
                                    placeholder='Your Last Name Here'
                                    value={regForm.lastName}
                                    onChange={handleChange("lastName")}
                                />
                            </FormContent>
                        </Form>
                    </Grid>

                    <Grid component='span' item xs={12}>                        
                        <Form onSubmit={handleSubmit(sendEmail)}>
                            <FormContent>
                                <TextField
                                    inputProps={{ 'aria-label': 'E-mail' }}
                                    label='Email'
                                    aria-label='E-mail'
                                    required
                                    type='email'
                                    placeholder='Your E-mail Here'
                                    value={regForm.email}
                                    onChange={handleChange("email")}
                                />
                            </FormContent>
                        </Form>    
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <h3>Reset Password Method #1</h3>
                        <Button
                            href='https://prytaneum.io/forgot-password/request'
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                        >
                            Password Reset Request
                        </Button>
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <h3>Reset Password Method #2</h3>
                        <PasswordResetForm onSuccess={() => {}} token={user?._id || 'undefined'} />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <h3>Logout</h3>
                        <Button
                            href='https://prytaneum.io/logout'
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

// less touch (mobile) friendly, but also works, if we want a `save` button
export function UserProfileEditable({ img }: Props) {
    const classes = useStyles();
    const [emailState, setState] = React.useState(
        'less touch (mobile) friendly, but also works, if we want a `save` button'
    );

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <EditableText
                            value={emailState}
                            // change later to use endpoint for backend
                            onChange={(str) => setState(str)}
                            label='Your E-mail'
                            inputProps={{
                                type: 'email',
                                'aria-label': 'E-mail',
                                placeholder: 'Your E-mail Here',
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
