/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Typography,
    Button,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
    Grid,
} from '@material-ui/core';
import { PrytaneumRoutes } from 'routes/utils';
import BackIcon from '@material-ui/icons/ArrowBack';

import Dialog from 'components/Dialog';
import useUser from 'hooks/useUser';
import useRouter from 'hooks/useRouter';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

interface PromptProps {
    /**
     * storybook prop
     */
    forceOpen?: boolean;
}

export default function Prompt({ forceOpen }: PromptProps) {
    const [user] = useUser();
    const [path, setPath] = React.useState<string>('/prompt');

    const [open, setOpen] = React.useState(Boolean(!user || forceOpen));
    const routes: PrytaneumRoutes = React.useMemo(
        () => [
            {
                path: '/login',
                action: () => (
                    <>
                        <Grid item xs='auto'>
                            <IconButton onClick={() => setPath('/prompt')}>
                                <BackIcon />
                            </IconButton>
                        </Grid>
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <LoginForm onSuccess={() => setOpen(false)} />
                        </DialogContent>
                    </>
                ),
            },
            {
                path: '/register',
                action: () => (
                    <>
                        <Grid item xs='auto'>
                            <IconButton onClick={() => setPath('/prompt')}>
                                <BackIcon />
                            </IconButton>
                        </Grid>
                        <DialogTitle>Register</DialogTitle>
                        <DialogContent>
                            <RegisterForm
                                onSuccess={() => setOpen(false)}
                                onFailure={() => {}}
                            />
                        </DialogContent>
                    </>
                ),
            },
            {
                path: '/prompt',
                action: () => (
                    <>
                        <DialogTitle>Not Logged In!</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Login or Register to gain access to do the
                                following:
                                <ul>
                                    <li>Submit Questions</li>
                                    <li>Like Questions</li>
                                    <li>Send Chat Messages</li>
                                </ul>
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: 'flex-end' }}>
                            <Button onClick={() => setOpen(false)}>
                                I just want to watch
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={() => setPath('/register')}
                            >
                                Register
                            </Button>
                            <Button
                                onClick={() => setPath('/login')}
                                variant='contained'
                                color='primary'
                            >
                                Login
                            </Button>
                        </DialogActions>
                    </>
                ),
            },
        ],
        []
    );
    const router = useRouter(routes);
    const component = React.useMemo(
        () => router.resolve(path) as React.ReactElement,
        [path, router]
    );
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            {component}
        </Dialog>
    );
}

Prompt.defaultProps = {
    forceOpen: false,
};
