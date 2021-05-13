import * as React from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// TODO: notifications
// import UserNotifications from '@local/domains/User/UserNotifications';
import { UserMenu } from '@local/features/accounts';
// TODO: user theme that doesn't make tabpanels disappear, interesting problem
// import UserTheme from '@local/domains/User/UserTheme';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    divider: {
        width: 1,
        height: '2em',
        marginRight: theme.spacing(1.5),
    },
    item: {
        marginRight: theme.spacing(1),
    },
}));

export default function Nav() {
    const classes = useStyles();

    return (
        <>
            <Title />
            {/* <UserNotifications className={classes.item} /> */}
            {/* <UserTheme className={classes.item} /> */}
            <Divider
                orientation='vertical'
                classes={{
                    vertical: classes.divider,
                }}
            />
            <UserMenu links={{ settings: '/app/settings', logout: '/logout' }} />
        </>
    );
}
