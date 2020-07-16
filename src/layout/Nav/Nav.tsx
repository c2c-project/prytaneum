import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { parseTitle } from '../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
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
    tabs?: React.ReactNode[] | React.ReactNode;
    back?: boolean;
}

interface Params {
    title?: string;
}

export default function Nav({ tabs, back }: Props) {
    const { title } = useParams<Params>();
    const history = useHistory(); // TODO: change this to not use history and instead have my own internal routing?
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
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
                    <Typography variant='h6' className={classes.title}>
                        {parseTitle(title)}
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                {tabs}
            </AppBar>
        </div>
    );
}

Nav.defaultProps = {
    tabs: <></>,
    back: false,
};

Nav.propTypes = {
    tabs: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
    back: PropTypes.bool,
};
