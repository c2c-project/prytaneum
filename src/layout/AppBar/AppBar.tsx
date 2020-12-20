import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    appbar: {
        backgroundColor: '#fff',
        color: theme.palette.getContrastText('#fff'),
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
    },
}));

interface Props {
    children?: JSX.Element | JSX.Element[];
}

export default function AppBar({ children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIAppBar
                className={classes.appbar}
                position='sticky'
                elevation={6}
            >
                <Toolbar>{children}</Toolbar>
            </MUIAppBar>
        </div>
    );
}

AppBar.defaultProps = {
    children: undefined,
};
