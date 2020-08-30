import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // height: '100%',
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        transition: 'inherit 2s ease-in 10s',
    },
    main: {
        width: '100%',
        flex: 1,
    },
}));

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function Nav({ children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='absolute'>
                <Toolbar>{children}</Toolbar>
            </AppBar>
        </div>
    );
}
