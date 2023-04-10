import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import MUIAppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useQueryLoader } from 'react-relay';

import { ConditionalRender } from '@local/components';
import { UserMenu, UserMenuLoader } from '@local/features/accounts';
import Title from './Title';
import { USER_CONTEXT_QUERY } from '@local/features/accounts/UserContext';
import { UserContextQuery } from '@local/__generated__/UserContextQuery.graphql';

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
    const [queryRef, loadQuery] = useQueryLoader<UserContextQuery>(USER_CONTEXT_QUERY);
    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [loadQuery, queryRef]);

    if (!queryRef) return <UserMenuLoader />;

    return <UserMenu queryRef={queryRef} />;
}

export function AppBar({ children, ...rest }: AppBarProps) {
    const classes = useStyles();
    return (
        <MUIAppBar className={classes.appbar} position='sticky' {...rest}>
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
