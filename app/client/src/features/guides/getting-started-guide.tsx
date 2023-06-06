import * as React from 'react';
import { Chip, Grid, Link, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import HelpIcon from '@mui/icons-material/Help';

import { RegisterFormDemo, LoginFormDemo, UserSettingsDemo } from '@local/features/accounts/Demos';
import { DashboardDemo } from '@local/features/dashboard/Demos/DashboardDemo';
import { useUser } from '../accounts';
import { Loader } from '@local/components/Loader/Loader.stories';

export default function GettingStartedGuide() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const { user, isLoading } = useUser();

    if (isLoading) return <Loader />;

    return (
        <Grid
            container
            width='100%'
            height='100%'
            textAlign='center'
            alignItems='center'
            justifyContent='center'
            paddingLeft={user ? (lgUpBreakpoint ? '250px' : 0) : lgUpBreakpoint ? '5%' : 0}
            paddingRight={user ? 0 : lgUpBreakpoint ? '5%' : 0}
            spacing={4}
            sx={{ scrollPaddingTop: '-10rem' }}
        >
            <Grid item xs={4} sm={3}>
                <img
                    style={{ objectFit: 'contain' }}
                    src='/static/prytaneum_logo.svg'
                    width='100%'
                    height='100%'
                    alt='Prytaneum Logo'
                />
            </Grid>
            <Grid item xs={12} sm={9} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h3'>
                    <BookOutlinedIcon style={{ fontSize: '2.25rem' }} /> <b>Guide to Prytaneum:</b> Getting Started
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    An introduction to Prytaneum
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    This article covers:
                </Typography>
                <Link href='#sign-in-or-registering'>Signing In or Registering</Link>
                <Link href='#dashboard'>Dashboard</Link>
                <Link href='#account-settings'>Account Settings</Link>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='sign-in-or-registering' paddingTop='80px'>
                    Signing In or Registering
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    To access what Prytaneum offer and fully experience a town hall event, you must create a Prytaneum
                    account. With an account, you will be able to ask, like, and quote questions asked during events as
                    a participant. If you don&#39;t have an account or are not logged in, you can find the{' '}
                    <b>Register</b> and <b>Login</b> buttons in the top right corner of every Prytaneum page.
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    To login, click on the login button and enter your account information into the menu. Finalize by
                    clicking <b>Login</b>.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <Paper
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '720px',
                        padding: theme.spacing(2),
                    }}
                >
                    <LoginFormDemo />
                </Paper>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='body1' fontSize='large'>
                    If you forgot your password to your Prytaneum account, you can reset your password by clicking{' '}
                    <b>Forgot Password?</b> to receive an email to reset your password.
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    If you don&#39;t have an account yet, register by clicking on the register button. Enter your
                    information into the menu and finalize by clicking <b>Register</b>.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <Paper
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '720px',
                        padding: theme.spacing(2),
                    }}
                >
                    <RegisterFormDemo />
                </Paper>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='dashboard' paddingTop='80px'>
                    Dashboard
                </Typography>
                <Typography variant='body1' fontSize='large' component='span'>
                    After logging in, you will see your Prytaneum dashboard. Within your dashboard, you have the ability
                    to see current events taking place and upcoming events you are invited to. Click on any{' '}
                    {<Chip color='secondary' icon={<HelpIcon />} label='#' />} to reveal more information about the
                    corresponding element.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={10} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <DashboardDemo />
            </Grid>
            <Grid item xs={12} sm={10} display='flex' flexDirection='column' gap='0.5rem'>
                <Typography variant='h4' id='account-settings' paddingTop='80px'>
                    Account Settings
                </Typography>
                <Typography variant='body1' fontSize='large'>
                    You can access your account settings by clicking on your profile in the top right corner of every
                    Prytaneum page after logging in. You can change your email, password, or delete your account while
                    in your account settings.
                </Typography>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' gap='0.5rem'>
                <Paper
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '720px',
                        padding: theme.spacing(2),
                    }}
                >
                    <UserSettingsDemo />
                </Paper>
            </Grid>
        </Grid>
    );
}
