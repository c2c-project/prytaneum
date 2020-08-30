import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Toolbar,
    Grow,
    IconButton,
    AppBar as MUIAppBar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
    back?: boolean;
    children?: JSX.Element | JSX.Element[];
}

export default function AppBar({ back, children }: Props) {
    const history = useHistory(); // TODO: change this to not use history and instead have my own internal routing?
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MUIAppBar position='static' elevation={0}>
                <Toolbar>
                    {back && (
                        <Grow in>
                            <IconButton
                                onClick={() => history.goBack()}
                                edge='start'
                                // className={classes.menuButton}
                                color='inherit'
                                aria-label='back-button'
                            >
                                <BackIcon />
                            </IconButton>
                        </Grow>
                    )}
                    {children}
                </Toolbar>
            </MUIAppBar>
        </div>
    );
}

AppBar.defaultProps = {
    back: false,
    children: <></>,
};
