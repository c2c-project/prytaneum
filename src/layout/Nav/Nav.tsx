import React from 'react';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import UserNotifications from 'domains/User/UserNotifications';
import UserMenu from 'domains/User/UserMenu';
import UserTheme from 'domains/User/UserTheme';
import useStorage from 'hooks/useStorage';
import history from 'utils/history';
import AppBar from '../AppBar';

function formatTitle(str: string | undefined): string | undefined {
    if (!str) {
        return str;
    }
    return str
        .split('-')
        .map((word) => {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        minWidth: '240px',
    },
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
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [isLoggedIn] = useStorage('isLoggedIn');

    const handleClick = () => setOpen(false);

    const title = (
        <Typography align='left' variant='h6' noWrap className={classes.title}>
            {formatTitle('prytaneum')}
        </Typography>
    );

    const loggedInBar = (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                className={classes.menuButton}
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
            {title}
            <UserNotifications className={classes.item} />
            <UserTheme className={classes.item} />
            <Divider
                orientation='vertical'
                classes={{
                    vertical: classes.divider,
                }}
            />
            <UserMenu />
        </>
    );

    return (
        <div>
            <AppBar>{isLoggedIn ? loggedInBar : title}</AppBar>
            {isLoggedIn && (
                <Drawer
                    classes={{ paper: classes.drawer }}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <nav>
                        <List onClick={handleClick}>
                            <li>
                                <ListItem
                                    button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.push('/user/my-townhalls');
                                    }}
                                >
                                    <ListItemText primary='My Townhalls' />
                                </ListItem>
                            </li>
                        </List>
                    </nav>
                </Drawer>
            )}
        </div>
    );
}
