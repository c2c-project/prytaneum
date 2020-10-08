import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // height: '100%',
        width: '100%',
    },
}));

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function AppBar({ children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIAppBar position='absolute' elevation={0}>
                <Toolbar>{children}</Toolbar>
            </MUIAppBar>
        </div>
    );
}
