import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import type { ClientSafeUser, RegisterForm } from 'prytaneum-typings';
import axios, { AxiosResponse } from 'axios';
import DoneIcon from '@material-ui/icons/Done';

import history from 'utils/history';
import Form from 'components/Form';
import TextField from 'components/TextField';
import EditableText from 'components/EditableText';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';
import Redirect from 'domains/Logical/Redirect';
import useEndpoint from 'hooks/useEndpoint';
import Login from 'pages/Login';
import Loader from 'components/Loader';
import useSnack from 'hooks/useSnack';
import useUser from 'hooks/useUser';
import useForm from 'hooks/useForm';
import { getMyInfo } from 'domains/Auth/api';
import { SentimentSatisfied } from '@material-ui/icons';

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

/*
    1. Check if user is logged in
        1a. if not, redirect to /login
        1b. if they are, proceed
    2. Get user info
        2a. Fill in Fname, Lname, Email
        2b. display the information
    3. Update User info
        3a. Check any changed field to be valid
            3ai. no blank names/emails, etc
        3b. POST to endpoint to update any changed field that **IS VALID**!
        3c. display snack saying update successful if response is good
            3ci. Refresh UserProfile to confirm it went into effect, might be annoying so maybe not
*/
export default function UserProfile({ img }: Props) {
    const classes = useStyles();
    const [user, setUser] = useUser();
    const initState: RegisterForm = { firstName: user?.name.first || "", lastName: user?.name.last || "", email: user?.email.address || "", password: '', confirmPassword: '' };
    const [snack] = useSnack();
    const [regForm, errors, handleSubmit, handleChange] = useForm(initState);
    const changeFN = React.useCallback(() => API.changeFName(user?.name.first || 'first name'), [user?.name.first]);
    const [sendFName, isFNload] = useEndpoint(changeFN, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.name.first}!`);
        },
    });
    const changeLN = React.useCallback(() => API.changeLName(user?.name.last || 'last name'), [user?.name.last]);
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

    // 1. check if user is logged in
    const isLoggedIn = user || undefined;
    if (isLoggedIn === undefined) {
        // 1a. if not, redirect to /login
        console.log('Redirecting');
        return <Redirect href='https://prytaneum.io/login' />;
    }
    // 1b. if they are, proceed

    // 2,a,b
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
