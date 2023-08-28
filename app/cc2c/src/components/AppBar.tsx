'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography, AppBar as MUIAppBar, Toolbar, Button, IconButton, useMediaQuery } from '@mui/material';
import type { AppBarProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '@local/lib/useAuth';
import { SignInButton } from './auth/SignInButton';
import { RegisterButton } from './auth/RegisterButton';
import { SignOutButton } from './auth/SignOutButton';
import { DashboardButton } from './DashboardButton';
import { TemporaryDrawer } from './TemporaryDrawer';
import { AdminMenuButton } from './AdminMenuButton';

export function AppBar({ children, ...restProps }: AppBarProps) {
    const theme = useTheme();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const { authenticated, isAdmin, isLoading } = useAuth();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        if (!open) setOpen(true);
    };

    const handleDrawerClose = () => {
        if (open) setOpen(false);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <MUIAppBar position='sticky' {...restProps}>
                <Toolbar>
                    {children}
                    {mdDownBreakpoint && (
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={handleDrawerOpen}
                            edge='start'
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        component={Button}
                        variant='h6'
                        color='inherit'
                        style={{ marginRight: '2rem' }}
                        onClick={() => router.push('/')}
                    >
                        CC2C
                    </Typography>
                    {/* Desktop Menu */}
                    <DashboardButton visible={!isLoading && authenticated && !mdDownBreakpoint} />
                    <div style={{ width: '1rem' }} />
                    <AdminMenuButton visible={!isLoading && isAdmin && !mdDownBreakpoint} />
                    <div style={{ flexGrow: 1 }} />
                    <SignInButton visible={!isLoading && !authenticated} />
                    <SignOutButton visible={!isLoading && authenticated} />
                    <RegisterButton visible={!isLoading && !authenticated} />
                </Toolbar>
            </MUIAppBar>
            <TemporaryDrawer open={open} handleDrawerClose={handleDrawerClose} onClose={toggleDrawer} />
        </React.Fragment>
    );
}
