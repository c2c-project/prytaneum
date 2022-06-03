import * as React from 'react';
import Image from 'next/image';
import { Grid, Link, Paper, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import makeStyles from '@mui/styles/makeStyles';

import { LoginForm, RegisterForm } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
        scrollPaddingTop: '-10rem',
    },
    paragraph: {
        fontSize: '18px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    centeredSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    icon: {
        fontSize: '2.25rem',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
        padding: theme.spacing(2),
    },
}));

export default function GettingStartedGuide() {
    const classes = useStyles();

    // const [open, setOpen] = React.useState(false);
    // const [infoIndex, setInfoIndex] = React.useState(0);

    // const info = [
    //     {
    //         title: 'Meeting Window',
    //         text: 'The window where you will see the speaker(s) and moderator(s).',
    //     },
    // ];

    // const handleClickOpen = (index: number) => {
    //     setInfoIndex(index - 1);
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Grid container alignItems='center' className={classes.root} justifyContent='center' spacing={4}>
            <Grid item xs={4} sm={3}>
                <Image
                    src='/static/prytaneum_logo.svg'
                    width={1107}
                    height={1108}
                    objectFit='contain'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Getting Started Guide</b>
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    An introduction to Prytaneum
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    This article covers:
                </Typography>
                <Link href='#sign-in-or-registering'>Signing In or Registering</Link>
                <Link href='#dashboard'>Dashboard</Link>
                <Link href='#account-settings'>Account Settings</Link>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='sign-in-or-registering'>
                    Signing In or Registering
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    To access what Prytaneum offer and fully experience a town hall event, you must create a Prytaneum
                    account. With an account, you will be able to ask, like, and quote questions asked during events as
                    a participant. If you don&#39;t have an account or are not logged in, you can find the{' '}
                    <b>Register</b> and <b>Login</b> buttons in the top right corner of every Prytaneum page.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    To login, click on the login button and enter your account information into the menu. Finalize by
                    clicking <b>Login</b>.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                {/* <Image
                    src='/static/guide/login-form.png'
                    width={431}
                    height={339}
                    objectFit='contain'
                    alt='Login Form'
                /> */}
                <Paper className={classes.paper}>
                    <LoginForm demo={true} />
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='body1' className={classes.paragraph}>
                    If you forgot your password to your Prytaneum account, you can reset your password by clicking{' '}
                    <b>Forgot Password?</b> to receive an email to reset your password.
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    If you don&#39;t have an account yet, register by clicking on the register button. Enter your
                    information into the menu and finalize by clicking <b>Register</b>.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                {/* <Image
                    src='/static/guide/register-form.png'
                    width={428}
                    height={574}
                    objectFit='contain'
                    alt='Login Form'
                /> */}
                <Paper className={classes.paper}>
                    <RegisterForm demo={true} />
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='dashboard'>
                    Dashboard
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    After logging in, you will see your Prytaneum dashboard. Within your dashboard, you have the ability
                    to see current events taking place and upcoming events you are invited to.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <Image
                    src='/static/guide/dashboard.png'
                    width={1920}
                    height={1080}
                    objectFit='contain'
                    alt='dashboard'
                />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='account-settings'>
                    Account Settings
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    You can access your account settings by clicking on your profile in the top right corner of every
                    Prytaneum page after logging in. You can change your email, password, or delete your account while
                    in your account settings.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <Image
                    src='/static/guide/account-settings.png'
                    width={1175}
                    height={1044}
                    objectFit='contain'
                    alt='dashboard'
                />
            </Grid>
        </Grid>
    );
}
