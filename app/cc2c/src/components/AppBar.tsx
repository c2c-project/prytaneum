'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography, AppBar as MUIAppBar, Toolbar, Button, IconButton } from '@mui/material';
import type { AppBarProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '@local/lib/useAuth';
import { SignInButton } from './SignInButton';
import { RegisterButton } from './RegisterButton';
import { SignOutButton } from './SignOutButton';
import { DashboardButton } from './DashboardButton';
import { PersistentDrawer } from './PersistentDrawer';

export function AppBar({ children, ...restProps }: AppBarProps) {
    const theme = useTheme();
    const router = useRouter();
    const { authenticated, isLoading } = useAuth();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <MUIAppBar position='sticky' {...restProps}>
                <Toolbar>
                    {children}
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component={Button}
                        variant='h6'
                        color='inherit'
                        style={{ marginRight: '2rem' }}
                        onClick={() => router.push('/')}
                    >
                        CC2C
                    </Typography>
                    <DashboardButton visible={!isLoading && authenticated} />
                    <div style={{ flexGrow: 1 }} />
                    <SignInButton visible={!isLoading && !authenticated} />
                    <SignOutButton visible={!isLoading && authenticated} />
                    <RegisterButton visible={!isLoading && !authenticated} />
                </Toolbar>
            </MUIAppBar>
            <PersistentDrawer open={open} handleDrawerClose={handleDrawerClose} />
        </React.Fragment>
    );
}
