/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, useMediaQuery, Drawer, IconButton, ContainerProps } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import useUser from 'hooks/useUser';
import Main from './Main';
import Page from './Page';
import AppBar, { Public, LoggedIn } from './AppBar';
import SideNav from './SideNav';

export interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    /**
     * for storybook only, should never be used in prod/app tree
     */
    showAsLoggedIn?: boolean;
    /**
     * for when displaying pages where we want no side nav (live townhalls)
     */
    hideSideNav?: boolean;
    /**
     * these are mui container props
     */
    ContainerProps?: Omit<ContainerProps, 'children'>;
    /**
     * disable default page padding
     */
    disablePadding?: boolean;
}

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        marginRight: theme.spacing(1),
    },
    drawer: {
        padding: theme.spacing(2, 0),
    },
    main: {
        padding: theme.spacing(3),
    },
}));

export default function Layout({
    children,
    showAsLoggedIn: loggedInOverride,
    hideSideNav: noSideNav,
    ContainerProps: _ContainerProps,
    disablePadding,
}: Props) {
    const [user] = useUser();
    const isLoggedIn = user || loggedInOverride;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const getAppBarContent = () => {
        if (!isLoggedIn) return <Public />;
        if (isMdDown)
            return (
                <>
                    {!noSideNav && (
                        <IconButton className={classes.menuIcon} onClick={() => setOpen(!open)} color='inherit'>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <LoggedIn />
                </>
            );
        return <LoggedIn />;
    };

    const getSideNav = () => {
        if (!user || noSideNav) return undefined;
        if (isMdDown)
            return (
                <Drawer classes={{ paper: classes.drawer }} open={open} onClose={() => setOpen(!open)}>
                    <SideNav user={user} onClick={() => setOpen(false)} />
                </Drawer>
            );
        return (
            <>
                <SideNav user={user} />
                <div style={{ paddingRight: 240 }} />
            </>
        );
    };

    return (
        <Page>
            <AppBar>{getAppBarContent()}</AppBar>
            <Grid container alignItems='flex-start' item xs={12}>
                {getSideNav()}
                <Main className={disablePadding ? undefined : classes.main} {..._ContainerProps}>
                    {children}
                </Main>
            </Grid>
        </Page>
    );
}

Layout.defaultProps = {
    showAsLoggedIn: false,
    noSideNav: false,
    ContainerProps: {},
    disablePadding: false,
};
