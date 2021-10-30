import * as React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Switch,
    Collapse,
    Typography,
    Button,
    Grid,
    Link as MUILink,
} from '@material-ui/core';
import { User, UserSettings } from '@local/graphql-types';
import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { TextField } from '@local/components/TextField';
import { ConfirmationDialog } from '@local/components/ConfirmationDialog';
import SettingsList from '@local/components/SettingsList';
import SettingsItem from '@local/components/SettingsItem';
import { useUser } from '@local/features/accounts';
import { useSnack, useForm } from '@local/features/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-relay';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { UpdateEmailFormMutation } from '@local/__generated__/UpdateEmailFormMutation.graphql'
import type { UpdatePasswordFormMutation } from '@local/__generated__/UpdatePasswordFormMutation.graphql'
import type { DeleteAccountFormMutation } from '@local/__generated__/DeleteAccountFormMutation.graphql'
import { UPDATE_EMAIL_FORM_MUTATION } from './UpdateEmailForm';
import { UPDATE_PASSWORD_FORM_MUTATION } from './UpdatePasswordForm';
import { DELETE_ACCOUNT_FORM_MUTATION } from './DeleteAccountForm';
import text from './help-text';

const initialModifyUserEmail = {
    newEmail: '',
};

export type TUpdateEmailForm = typeof initialModifyUserEmail;

const initialModifyUserPassword = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

export type TUpdatePasswordForm = typeof initialModifyUserPassword;

const intiialDeleteAccount = {
    password: '',
    confirmPassword: '',
};

export type TDeleteAccountForm = typeof intiialDeleteAccount;

/* DEPTH = 3 CURRYING HERE, 
    top to bottom: 
        1. Pass in the setState function
        2. Pass in the key of the checkbox in the state
        3. handle the change in checkboxes state
*/
const buildCheckboxUpdate = <U extends Record<string, boolean | string[]>>(
    setState: React.Dispatch<React.SetStateAction<U>>
) => (id: keyof U) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { checked } = e.target;
    setState((prev) => ({ ...prev, [id]: checked }));
};

const useStyles = makeStyles((theme) => ({
    // indent: {
    //     paddingLeft: theme.spacing(4),
    // },
    // fullWidth: {
    //     width: '100%',
    // },
    form: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    link: {
        paddingLeft: theme.spacing(1),
    },
}));





// all really small one time user @local/components go here
interface DisplayItem {
    title: string;
    component: JSX.Element;
}

interface Props {
    list: DisplayItem[];
    setContent: (c: JSX.Element) => void;
}

export function TownhallUserSettings({ settings }: { settings: UserSettings }) {
    // const [state, setState] = React.useState(user.settings);
    // const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    // TODO: API Request
    return (
        <SettingsList>
            <SettingsItem
                helpText={text.townhall.anonymous}
                name='Appear Anonymous'
            >
                <Switch
                    checked={settings?.isAnonymous}
                    // onChange={buildHandler('anonymous')}
                />
            </SettingsItem>
        </SettingsList>
    );
}

export function NotificationSettings({ settings }: { settings: UserSettings }) {
    // const [state, setState] = React.useState(user.settings);
    // const buildHandler = buildCheckboxUpdate<typeof state>(setState);
    // TODO: API Request
    return (
        <SettingsList>
            <SettingsItem helpText={text.notifications.enabled} name='Enabled'>
                <Switch
                    checked={settings?.isNotificationsEnabled}
                    // onChange={buildHandler('enabled')}
                />
            </SettingsItem>
            <Collapse>
                <SettingsItem
                    helpText={text.notifications.types}
                    name='Notification Types'
                >
                    <div>TODO</div>
                </SettingsItem>
            </Collapse>
        </SettingsList>
    );
}

export function ModifyUserEmail({ user }: { user: User }) {
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialModifyUserEmail);
    const [commit] = useMutation<UpdateEmailFormMutation>(UPDATE_EMAIL_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();
    
    const [, setUser] = useUser();

    // styling hook
    const classes = useStyles();

    function handleCommit(submittedForm: TUpdateEmailForm) {
        // add user email to input passed into the commit
        const userEmail = user.email ? user.email : ''
        const completeForm = { currentEmail: userEmail, ...submittedForm }
        commit({
            variables: { input: completeForm },
            onCompleted({ updateEmail }) {
                if (updateEmail.isError) {
                    displaySnack(updateEmail.message);
                } else {
                    displaySnack('Email changed successfully!');
                    setUser(updateEmail.body);
                    // clear form
                    form.newEmail = '';
                }
            },
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid component='span' item xs={12}>
                <Typography variant='h6'>Change Email</Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body1'>
                    <b>Current email:</b> {user.email}
                </Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    A verification email will be sent to the new email to confirm the update.
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your new email' }}
                        label='Enter your new email'
                        helperText={errors.newEmail}
                        error={Boolean(errors.newEmail)}
                        required
                        type='email'
                        variant='outlined'
                        value={form.newEmail}
                        onChange={handleChange('newEmail')}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button type='submit' variant='outlined' color='primary'>
                        Update email
                    </Button>
                </Grid>
            </Form>
        </Grid>
    )
}

export function ModifyUserPassword({ user }: { user: User }) {
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(initialModifyUserPassword);
    const [commit] = useMutation<UpdatePasswordFormMutation>(UPDATE_PASSWORD_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();
    
    const [, setUser] = useUser();

    // styling hook
    const classes = useStyles();
    
    function handleCommit(submittedForm: TUpdatePasswordForm) {
        // add user email to input passed into the commit
        const userEmail = user.email ? user.email : ''
        const completeForm = { email: userEmail, ...submittedForm }
        commit({
            variables: { input: completeForm },
            onCompleted({ updatePassword }) {
                if (updatePassword.isError) {
                    displaySnack(updatePassword.message);
                } else {
                    displaySnack('Password changed successfully!');
                    setUser(updatePassword.body);
                    // clear form
                    form.oldPassword = ''
                    form.newPassword = ''
                    form.confirmNewPassword = ''
                }
            },
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid component='span' item xs={12}>
                <Typography variant='h6'>Change Password</Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    Passwords must be at least 8 characters and contain both lowercase and uppercase letters, at least one number, and at least one special character (e.g. +_!@#$%^&*., ?).
                </Typography>
            </Grid>
            
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your old password' }}
                        label='Enter your old password'
                        helperText={errors.oldPassword}
                        error={Boolean(errors.oldPassword)}
                        required
                        variant='outlined'
                        type='password'
                        value={form.oldPassword}
                        onChange={handleChange('oldPassword')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your new password' }}
                        label='Enter your new password'
                        helperText={errors.newPassword}
                        error={Boolean(errors.newPassword)}
                        required
                        variant='outlined'
                        type='password'
                        value={form.newPassword}
                        onChange={handleChange('newPassword')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your new password again' }}
                        label='Confirm your new password'
                        helperText={errors.confirmNewPassword}
                        error={Boolean(errors.confirmNewPassword)}
                        required
                        variant='outlined'
                        type='password'
                        value={form.confirmNewPassword}
                        onChange={handleChange('confirmNewPassword')}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button type='submit' variant='outlined' color='primary'>
                        Update password
                    </Button>
                    <Link href='/forgot-password' passHref>
                        <MUILink className={classes.link} color='primary'>
                            Forgot Password?
                        </MUILink>
                    </Link>
                </Grid>
            </Form>
        </Grid>
    )
}

export const ButtonList = ({ list, setContent }: Props) => (
    <List>
        {list.map(({ title, component }) => (
            <li key={title}>
                <ListItem
                    key={title}
                    button
                    onClick={() => setContent(component)}
                >
                    <ListItemText primary={title} />
                </ListItem>
            </li>
        ))}
    </List>
);

export const AppearAnonymous = () => (
    <span>
        <h1>
            {/* TODO: dialog text depends on if they are already anonymous */}
            You will now appear anonymous.
        </h1>
    </span>
);

export const Notifications = () => (
    <span>
        <button type='button' onClick={() => {}}>
            Notify me about upcoming Townhalls
        </button>
    </span>
);

export const Appearance = () => (
    <span>
        <h1>Dark mode</h1>
        <h1>Color Scheme</h1>
    </span>
);

export const Logout = () => (
    <span>
        <button
            type='button'
            onClick={() => {}} // ROUTING: to /Login or /TownhallList
        >
            Click here to return to the home page
        </button>
    </span>
);

export const DisableAccount = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <SettingsItem
                helpText='You will no longer receive notifications about Town Halls and
                    you can no longer join live Town Halls. You will still be able
                    to log into your account.'
                name='Disable Account'
            >
                <Button
                    variant='outlined'
                    onClick={() => setOpen(true)}
                    style={{ color: 'red', borderColor: 'red' }}
                >
                    Disable
                </Button>
            </SettingsItem>
            <ConfirmationDialog
                open={open}
                onClose={() => setOpen(false)}
                // FIXME:
                // eslint-disable-next-line no-console
                onConfirm={() => console.log('TODO')}
                title='Disable Account?'
            >
                You will no longer receive notifications about Town Halls and
                you can no longer join live Town Halls. You will still be able
                to log into your account.
            </ConfirmationDialog>
        </div>
    );
};

export function DeleteAccount({ user }: { user: User }) {
    // form state hooks
    const [form, errors, handleSubmit, handleChange] = useForm(intiialDeleteAccount);
    const [commit] = useMutation<DeleteAccountFormMutation>(DELETE_ACCOUNT_FORM_MUTATION);

    // user feedback
    const { displaySnack } = useSnack();

    // routing hook
    const router = useRouter();

    // styling hook
    const classes = useStyles();

    function handleCommit(submittedForm: TDeleteAccountForm) {
        // add user email to input passed into the commit
        const userEmail = user.email ? user.email : ''
        const completeForm = { email: userEmail, ...submittedForm }
        commit({
            variables: { input: completeForm },
            onCompleted({ deleteAccount }) {
                if (deleteAccount.isError) {
                    displaySnack(deleteAccount.message);
                } else {
                    displaySnack('Account deleted successfully!');
                    // route to login after successfully deleting account
                    router.push('/login');
                }
            },
        });
    }
    
    return (
        <Grid container spacing={2}>
            <Grid component='span' item xs={12}>
                <Typography variant='h6'>Delete Account</Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    All of your account information will be erased from Prytaneum.
                </Typography>
            </Grid>
            <Grid component='span' item xs={12}>
                <Typography variant='body2'>
                    <b>This action is irreversible.</b> Please enter your password below
                    twice to confirm.
                </Typography>
            </Grid>
            <Form className={classes.form} onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your password' }}
                        label='Enter your password'
                        helperText={errors.password}
                        error={Boolean(errors.password)}
                        required
                        variant='outlined'
                        type='password'
                        value={form.password}
                        onChange={handleChange('password')}
                        spellCheck={false}
                    />
                    <TextField
                        inputProps={{ 'aria-label': 'Enter your password again' }}
                        label='Confirm your password to DELETE your account'
                        helperText={errors.confirmPassword}
                        error={Boolean(errors.confirmPassword)}
                        required
                        variant='outlined'
                        type='password'
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid component='span' item xs={12}>
                    <Button type='submit' variant='outlined' style={{ color: 'red', borderColor: 'red' }}>
                        Delete account
                    </Button>
                </Grid>
            </Form>
        </Grid>
        
    );
}

export const Feedback = () => (
    <span>
        <h1> hows our driving? </h1>
    </span>
);

export const AboutUs = () => (
    <span>
        <h1>this was made somehow by some people</h1>
    </span>
);

export const PrivacyPolicy = () => (
    <span>
        <h1>Information is important.</h1>
    </span>
);

export const TermsOfService = () => (
    <span>
        <h1>plz no hurt us we no hurt u</h1>
    </span>
);
