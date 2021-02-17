import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import type { RegisterForm } from 'prytaneum-typings';

import Form from 'components/Form';
import TextField from 'components/TextField';
import EditableText from 'components/EditableText';
import FormContent from 'components/FormContent';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';
import API from 'domains/Auth/api';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import useUser from 'hooks/useUser';
import useForm from 'hooks/useForm';

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

const RequiredUser = () => {
    const [user, setUser] = useUser();
    // if no user is logged in
    if (!user) throw new Error('RequiredUser() should never be accessed in a context where the user may not be logged in');
    return [user, setUser] as const;
}

export default function UserProfile({ img }: Props) {
    const classes = useStyles();
    const [snack] = useSnack();
    const [user, setUser] = RequiredUser();
    const initState: RegisterForm = { firstName: user.name.first, lastName: user.name.last, email: user.email.address, password: '', confirmPassword: '' };
    const [regForm, errors, handleSubmit, handleChange] = useForm(initState);
    const changeBothNames = React.useCallback(() => API.changeName(user.name.first, user.name.last), [user.name.first, user.name.last]);
    const [sendName, isNameloading] = useEndpoint(changeBothNames, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.name.first} ${data.user.name.last}!`);
        },
    });
    const changeEmail = React.useCallback(() => API.changeEmail(user?.email.address || "email"), [user?.email.address]);
    const [sendEmail, isEMload] = useEndpoint(changeEmail, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.email.address}!`);
        },
    });

    // const handleTextChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //     data: string
    // ) => {
    //     e.preventDefault();
    //     const { value } = e.target;
    //     setUser((state) => ({ data: value }))
    // }

    // const handleNameSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault();
    //     sendName();
    // }

    // const handleEmailSubmit = (e: React.SyntheticEvent) => {
    //     e.preventDefault();
    //     sendEmail();
    // }

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        {/* ROUTING: to page to upload new photo */}
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    
                    <Grid component='span' item xs={12}>
                        {/* <Form onSubmit={handleNameSubmit}> */}
                        <Form onSubmit={handleSubmit()}>
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
                                    // value={user.name.first}
                                    onChange={handleChange("firstName")}
                                />
                            </FormContent>
                        </Form>
                    </Grid>
                    
                    <Grid component='span' item xs={12}>
                        {/* <Form onSubmit={handleNameSubmit}> */}
                        <Form onSubmit={handleSubmit()}>
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
                                    // value={user.name.last}
                                    onChange={handleChange("lastName")}
                                />
                            </FormContent>
                        </Form>
                    </Grid>

                    <Grid component='span' item xs={12}>                        
                        {/* <Form onSubmit={handleEmailSubmit}> */}
                        <Form onSubmit={handleSubmit()}>
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
