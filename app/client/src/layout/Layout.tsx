/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Grid, useMediaQuery, IconButton, ContainerProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '@local/features/accounts';

import Main from './Main';
import Page from './Page';
import { AppBar } from './AppBar';
import { SideNav } from './SideNav';
// import { Footer } from './Footer';

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
    const { user } = useUser();

    // hardcode breakpoint based on when page resizes (default keys hid element too early or too late)
    const isLargeScreen = useMediaQuery('(max-width:1520px)');
    const isSideNavHidden = React.useMemo(
        () => isLargeScreen || !!noSideNav || !user,
        [isLargeScreen, noSideNav, user]
    );

    return (
        <Page>
            <AppBar sx={{ zIndex: (theme) => (!isSideNavHidden ? theme.zIndex.drawer + 1 : undefined) }}>
                {isSideNavHidden && (
                    <IconButton
                        className={classes.menuIcon}
                        onClick={() => setOpen(!open)}
                        color='inherit'
                        size='large'
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </AppBar>
            <Grid container alignItems='flex-start' item xs={12}>
                <SideNav isOpen={open} close={() => setOpen(false)} isHidden={isSideNavHidden} />
                <Main className={disablePadding ? undefined : classes.main} {..._ContainerProps}>
                    {children}
                </Main>
            </Grid>
            {/* <Footer /> */}
        </Page>
    );
}

Layout.defaultProps = {
    showAsLoggedIn: false,
    noSideNav: false,
    ContainerProps: {},
    disablePadding: false,
};
