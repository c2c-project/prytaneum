import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import type { RegisterForm, User } from 'prytaneum-typings';

import Form from 'components/Form';
import TextField from 'components/TextField';
import FormContent from 'components/FormContent';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';
import API from 'domains/Auth/api';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import useUser from 'hooks/useUser';
import useForm from 'hooks/useForm';

interface Props {
    // eslint-disable-next-line react/require-default-props
    img?: string,
    id?: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 1, 1, 1),
        height: '100%',
        width: '100%',
    },
}));

export function useRequiredUser() {
    const [user, setUser] = useUser();
    // if no user is logged in
    if (!user)
        throw new Error('useRequiredUser() should never be accessed in a context where the user may not be logged in');
    return [user, setUser] as const;
}

const initRegForm = (user: Pick<User<string>, '_id' | 'email' | 'name' | 'roles' | 'settings'>) => {
    return {
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email.address,
        password: '',
        confirmPassword: '',
    } as RegisterForm;
};

export default function UserProfile({ img, id }: Props) {
    const classes = useStyles();
    const [user, setUser] = useRequiredUser();
    const initState = initRegForm(user);
    const [snack] = useSnack();
    const [regForm, errors, handleSubmit, handleChange] = useForm(initState);
    const changeBothNames = React.useCallback(() => API.changeName(regForm.firstName, regForm.lastName), [
        regForm.firstName,
        regForm.lastName,
    ]);
    const [sendName, isNameloading] = useEndpoint(changeBothNames, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.name.first} ${data.user.name.last}!`);
        },
    });
    const changeEmail = React.useCallback(() => API.changeEmail(regForm.email), [regForm.email]);
    const [sendEmail, isEMload] = useEndpoint(changeEmail, {
        onSuccess: ({ data }) => {
            setUser(data.user);
            snack(`Updated ${data.user.email.address}!`);
        },
    });

    return (
        <div className={classes.root} id={id}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        {/* ROUTING: to page to upload new photo */}
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <Form onSubmit={handleSubmit(sendName)}>
                            <FormContent>
                                <TextField
                                    inputProps={{ 'aria-label': 'First Name' }}
                                    label='First Name'
                                    aria-label='First Name'
                                    id='fName'
                                    required
                                    type='text'
                                    value={regForm.firstName}
                                    onChange={handleChange('firstName')}
                                />
                            </FormContent>
                        </Form>
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <Form onSubmit={handleSubmit(sendName)}>
                            <FormContent>
                                <TextField
                                    inputProps={{ 'aria-label': 'Last Name' }}
                                    label='Last Name'
                                    aria-label='Last Name'
                                    id='lName'
                                    required
                                    type='text'
                                    value={regForm.lastName}
                                    onChange={handleChange('lastName')}
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
                                    id='email'
                                    required
                                    type='email'
                                    value={regForm.email}
                                    onChange={handleChange('email')}
                                />
                            </FormContent>
                        </Form>
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <h3>Reset Password</h3>
                        <PasswordResetForm onSuccess={() => {}} token={user?._id || 'undefined'} />
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid component='span' item xs={12}>
                        <h3>Logout</h3>
                        <Button
                            // we want a relative link, ie just /logout
                            // migrating app, maybe not needed at this moment
                            // href='https://prytaneum.io/logout'
                            // TODO
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                        >
                            Logout (TODO)
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

UserProfile.defaultProps = {
    img: undefined,
    id: undefined
}