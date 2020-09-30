import React from 'react';
import {
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Menu,
    MenuItem,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    AccountCircleOutlined,
    ExitToApp,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { User } from 'types';

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
    rightMenu: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    drawer: {
        minWidth: '240px',
    },
}));

export default function Nav() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const isLoggedIn = get('isLoggedIn');

    const handleClick = () => setOpen(false);

    const userMenu = (
        <div className={classes.rightMenu}>
            <IconButton
                color='inherit'
                onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
                aria-label='user-menu'
            >
                <AccountCircleOutlined />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
            >
                <MenuItem button>
                    <ListItemText primary='Profile' />
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
        <Typography align='left' variant='h6' noWrap>
            {formatTitle('prytaneum')}
        </Typography>
    );
    const loggedInBar = (
        <AppBar>
            <IconButton
                onClick={() => setOpen(true)}
                className={classes.menuButton}
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
            {title}
            {userMenu}
        </AppBar>
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
