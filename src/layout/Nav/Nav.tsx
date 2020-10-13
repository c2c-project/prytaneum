import React from 'react';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Menu,
    MenuItem,
    Tooltip,
} from '@material-ui/core';
import { Menu as MenuIcon, AccountCircleOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

import { ThemeSelector } from 'contexts/Theme';
import { get } from 'utils/storage';
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
}));

export default function Nav() {
    const [toggle] = React.useContext(ThemeSelector);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const isLoggedIn = get('isLoggedIn');

    const handleClick = () => setOpen(false);

    const userMenu = (
        <div>
            <Tooltip title='Toggle Dark or Light Mode'>
                <IconButton color='inherit' edge='start' onClick={toggle}>
                    <InvertColorsIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title='User Menu'>
                <IconButton
                    color='inherit'
                    onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
                    aria-label='user-menu'
                    edge='end'
                >
                    <AccountCircleOutlined />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
            >
                <MenuItem
                    button
                    onClick={() => {
                        history.push('/user/settings');
                    }}
                >
                    <ListItemText primary='Settings' />
                </MenuItem>
                <MenuItem
                    button
                    onClick={() => {
                        history.push('/logout');
                    }}
                >
                    <ListItemText primary='Logout' />
                </MenuItem>
            </Menu>
        </div>
    );
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
            {userMenu}
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
