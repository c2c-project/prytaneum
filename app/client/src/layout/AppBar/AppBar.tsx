import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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

interface Props {
    children?: React.ReactElement | React.ReactNode;
}

export default function AppBar({ children }: Props) {
    const classes = useStyles();

    return (
        <MUIAppBar className={classes.appbar} position='sticky'>
            <Toolbar>{children}</Toolbar>
        </MUIAppBar>
    );
}

AppBar.defaultProps = {
    children: undefined,
};
