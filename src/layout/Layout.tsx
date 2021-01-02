import React from 'react';
import {
    Grid,
    useMediaQuery,
    useTheme,
    Drawer,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { UserContext } from 'contexts/User';
import Main from './Main';
import Page from './Page';
import AppBar, { Public, LoggedIn } from './AppBar';
import SideNav from './SideNav';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    /**
     * for storybook only, should never be used in prod/app tree
     */
    showAsLoggedIn?: boolean;
}

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        marginRight: theme.spacing(1),
    },
    drawer: {
        padding: theme.spacing(2, 0),
    },
}));

export default function Layout({
    children,
    showAsLoggedIn: loggedInOverride,
}: Props) {
    const user = React.useContext(UserContext);
    const isLoggedIn = user || loggedInOverride;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const getAppBarContent = React.useCallback(() => {
        if (!isLoggedIn) return [<Public />];
        if (isMdDown)
            return [
                <IconButton
                    className={classes.menuIcon}
                    onClick={() => setOpen(!open)}
                    color='inherit'
                >
                    <MenuIcon />
                </IconButton>,
                <LoggedIn />,
            ];
        return [<LoggedIn />];
    }, [isMdDown, open, setOpen, isLoggedIn]);

    const getSideNav = React.useCallback(() => {
        if (!user) return undefined;
        const nav = <SideNav user={user} />;
        if (isMdDown)
            return (
                <Drawer
                    classes={{ paper: classes.drawer }}
                    open={open}
                    onClose={() => setOpen(!open)}
                >
                    {nav}
                </Drawer>
            );
        return nav;
    }, [user, isMdDown, open, setOpen, isLoggedIn]);

    return (
        <Page>
            <AppBar>{getAppBarContent()}</AppBar>
            <Grid container alignItems='flex-start' item xs={12}>
                {getSideNav()}
                <Main>{children}</Main>
            </Grid>
        </Page>
    );
}

Layout.defaultProps = {
    showAsLoggedIn: false,
};
