import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(() => ({
    root: {
        flex: 1,
    },
}));

interface Props {
    children?: JSX.Element | JSX.Element[];
}

export default function AppBar({ children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIAppBar position='sticky' elevation={0}>
                <Toolbar>{children}</Toolbar>
            </MUIAppBar>
        </div>
    );
}

AppBar.defaultProps = {
    children: undefined,
};
