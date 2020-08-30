import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Zoom,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '../AppBar';

const useStyles = makeStyles((theme) => ({
    hamburgerIcon: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
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

interface Props {
    isVisible: boolean;
}

export default function Nav({ isVisible }: Props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClick = () => setOpen(false);

    return (
        <div>
            <Zoom in={isVisible} timeout={300}>
                <div>
                    <AppBar>
                        <div className={classes.hamburgerIcon}>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                        <div className={classes.rightMenu}>
                            <Button
                                color='inherit'
                                component={Link}
                                to='/auth/login'
                            >
                                Login
                            </Button>
                        </div>
                    </AppBar>
                </div>
            </Zoom>
            <Drawer
                classes={{ paper: classes.drawer }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <nav>
                    <List>
                        <li>
                            <ListItem
                                button
                                component={Link}
                                to='/townhalls/list'
                                onClick={handleClick}
                            >
                                <ListItemText primary='Townhalls' />
                            </ListItem>
                        </li>
                    </List>
                </nav>
            </Drawer>
        </div>
    );
}
