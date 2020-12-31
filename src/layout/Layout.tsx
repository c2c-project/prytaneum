import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';

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

const LoggedInBar = () => (
    <AppBar>
        <LoggedIn />
    </AppBar>
);
const PublicBar = () => (
    <AppBar>
        <Public />
    </AppBar>
);

export default function Layout({
    children,
    showAsLoggedIn: loggedInOverride,
}: Props) {
    const user = React.useContext(UserContext);
    const isLoggedIn = user || loggedInOverride;

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Page>
            {isLoggedIn && <LoggedInBar />}
            {!isLoggedIn && <PublicBar />}
            <Grid container alignItems='flex-start' item xs={12}>
                {!isMdDown && user && <SideNav user={user} />}
                <Main>{children}</Main>
            </Grid>
        </Page>
    );
}

Layout.defaultProps = {
    showAsLoggedIn: false,
};
