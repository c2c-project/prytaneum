/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Grid, useMediaQuery, IconButton, ContainerProps } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Main from './Main';
import Page from './Page';
import { AppBar } from './AppBar';
import { SideNav } from './SideNav';

export interface LayoutProps {
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
    main: {
        padding: theme.spacing(3),
    },
}));

export function Layout({
    children,
    hideSideNav: noSideNav,
    ContainerProps: _ContainerProps,
    disablePadding,
}: LayoutProps) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Page>
            <AppBar>
                {!noSideNav && isMdDown && (
                    <IconButton className={classes.menuIcon} onClick={() => setOpen(!open)} color='inherit'>
                        <MenuIcon />
                    </IconButton>
                )}
            </AppBar>
            <Grid container alignItems='flex-start' item xs={12}>
                <SideNav isOpen={open} close={() => setOpen(false)} isHidden={isMdDown || !!noSideNav} />
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
