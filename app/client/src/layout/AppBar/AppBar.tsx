import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useQueryLoader } from 'react-relay';

import { UserMenuQuery } from '@local/__generated__/UserMenuQuery.graphql';
import { ConditionalRender } from '@local/components';
import { UserMenu, UserMenuLoader, USER_MENU_QUERY } from '@local/features/accounts';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: '#fff',
        flexGrow: 0,
        color: theme.palette.getContrastText('#fff'),
        overscrollBehavior: 'contain',
        '&::after': {
            content: '""',
            width: '95%',
            margin: '0 2.5%',
            position: 'absolute',
            height: '6px',
            backgroundColor: theme.palette.primary.light,
            bottom: '-1px',
            borderRadius: '4px',
            // borderBottom: `3px solid ${theme.palette.primary.light}`,
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: theme.spacing(3),
        },
    },
}));

function PreloadedUserMenu() {
    const [queryRef, loadQuery] = useQueryLoader<UserMenuQuery>(USER_MENU_QUERY);
    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [loadQuery, queryRef]);

    if (!queryRef) return <UserMenuLoader />;

    return <UserMenu queryRef={queryRef} />;
}

export interface AppBarProps {
    children: React.ReactNode | React.ReactNodeArray;
}

export function AppBar({ children }: AppBarProps) {
    const classes = useStyles();

    return (
        <MUIAppBar className={classes.appbar} position='sticky'>
            <Toolbar>
                {children}
                <Title />
                <ConditionalRender client>
                    <React.Suspense fallback={<UserMenuLoader />}>
                        <PreloadedUserMenu />
                    </React.Suspense>
                </ConditionalRender>
                <ConditionalRender server>
                    <UserMenuLoader />
                </ConditionalRender>
            </Toolbar>
        </MUIAppBar>
    );
}
