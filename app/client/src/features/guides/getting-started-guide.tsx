import * as React from 'react';
import { Chip, Grid, Link, Paper, Typography } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';

import { RegisterFormDemo, LoginFormDemo, UserSettingsDemo } from '@local/features/accounts/Demos';
import { DashboardDemo } from '@local/features/dashboard/Demos/DashboardDemo';
import { useUser } from '../accounts';
import { Loader } from '@local/components/Loader/Loader.stories';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 250,
        },
        minHeight: '85vh',
        scrollPaddingTop: '-10rem',
    },
    rootLoggedOut: {
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        },
        minHeight: '85vh',
        scrollPaddingTop: '-10rem',
    },
    heading: {
        paddingTop: '80px',
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
    paperMobile: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
        padding: theme.spacing(2),
    },
    paperDesktop: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        padding: theme.spacing(2),
    },
    contain: {
        objectFit: 'contain',
        maxWidth: '250px',
    },
}));

export default function GettingStartedGuide() {
    const classes = useStyles();
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    return (
        <Grid
            container
            alignItems='center'
            className={user ? classes.root : classes.rootLoggedOut}
            justifyContent='center'
            spacing={4}
        >
            <Grid item xs={4} sm={3}>
                <img
                    className={classes.contain}
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    height='100%'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon} /> <b>Guide to Prytaneum:</b> Getting Started
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
                <Typography variant='h4' id='sign-in-or-registering' className={classes.heading}>
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
                <Paper className={classes.paperMobile}>
                    <LoginFormDemo />
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
                <Paper className={classes.paperMobile}>
                    <RegisterFormDemo />
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='dashboard' className={classes.heading}>
                    Dashboard
                </Typography>
                <Typography variant='body1' className={classes.paragraph} component='span'>
                    After logging in, you will see your Prytaneum dashboard. Within your dashboard, you have the ability
                    to see current events taking place and upcoming events you are invited to. Click on any{' '}
                    {<Chip color='secondary' icon={<HelpIcon />} label='#' />} to reveal more information about the
                    corresponding element.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <DashboardDemo />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h4' id='account-settings' className={classes.heading}>
                    Account Settings
                </Typography>
                <Typography variant='body1' className={classes.paragraph}>
                    You can access your account settings by clicking on your profile in the top right corner of every
                    Prytaneum page after logging in. You can change your email, password, or delete your account while
                    in your account settings.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.centeredSection}>
                <Paper className={classes.paperDesktop}>
                    <UserSettingsDemo />
                </Paper>
            </Grid>
        </Grid>
    );
}
