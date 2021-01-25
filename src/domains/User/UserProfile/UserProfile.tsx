import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import axios, { AxiosResponse } from 'axios';
// import DoneIcon from '@material-ui/icons/Done';

import TextField from 'components/TextField';
import EditableText from 'components/EditableText';
import PasswordResetForm from 'domains/Auth/PasswordResetForm';
// import useEndpoint from 'hooks/useEndpoint';
// import useSnack from 'hooks/useSnack';
// import useForm from 'hooks/useForm';
import { getMyInfo } from '../../Auth/api';
// import { SentimentSatisfied } from '@material-ui/icons';

interface Props {
    // eslint-disable-next-line react/require-default-props
    img?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 1, 1, 1),
        height: '100%',
        width: '100%',
    },
}));

// const initialState: ForgotPassForm = { password: '', confirmPassword: '' };
export default function UserProfile({ img }: Props) {
    const classes = useStyles();
    // const [snack] = useSnack();
    // const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    // const builtRequest = React.useCallback(() => API.forgotPassReset(token, form), [form, token]);
    // const [sendRequest, isLoading] = useEndpoint(builtRequest, {
    //     onSuccess: () => {
    //         snack('Successfully reset password!');
    //         onSuccess();
    //     },
    // });
    // async function changePass(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     // const [data, setData] = React.useState<AxiosResponse | null | void>(null);
    //     const [end, prom] = useEndpoint(changePassword, { token: e.target.value });
    //     const req = React.useCallback(() => API.changePassword(e.target.value));
    // }
    // => {
    //     useEndpoint(changePassword, { token: e.target.value });
    // const [pass, setPass] = React.useState('');
    const handlePassChange = async () => {
        const info = await getMyInfo().then(function (res) {
            return res;
        });
        return info.data.name;
    };

    return (
        <div className={classes.root}>
            <Grid container alignContent='center' spacing={2}>
                <Grid container spacing={2} id='userInfo'>
                    <Grid component='span' item xs={12}>
                        <Avatar src={img} alt='Profile Avatar' />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        {/* ROUTING: to page to upload new photo */}
                        <TextField
                            inputProps={{ 'aria-label': 'First Name' }}
                            label='First Name'
                            aria-label='First Name'
                            id='fName'
                            required
                            type='text'
                            placeholder='Your First Name Here'
                            onChange={() => {}}
                        />
                    </Grid>
                    <Grid component='span' item xs={12}>
                        <TextField
                            inputProps={{ 'aria-label': 'E-mail' }}
                            label='E-mail'
                            aria-label='E-mail'
                            required
                            type='email'
                            placeholder='Your E-mail Here'
                            onChange={() => {}}
                        />
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
                        {/* TODO: fix token here */}
                        <h3>Reset Password Method #2</h3>
                        <PasswordResetForm onSuccess={() => {}} token={handlePassChange()} />
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
