import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        // overflowY: 'scroll'
    },
    maxHeight: {
        height: '100%',
    },
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function MessageList({ children }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List dense>{children}</List>
        </div>
    );
}

MessageList.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
