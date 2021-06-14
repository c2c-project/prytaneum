import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ListCell from './ListCell';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
}));

export interface Props {
    rowProps: Array<{
        _id: string | number;
        primary: string;
        secondary?: string;
    }>;
    emptyMessage?: string;
}

const ListOverflow = ({ rowProps, emptyMessage }: Props) => {
    const classes = useStyles();

    if (rowProps.length === 0) {
        return <Typography>{emptyMessage}</Typography>;
    }

    const structuredUserList = rowProps.map((row) => (
        <Fragment key={row._id}>
            <ListCell primary={row.primary} secondary={row.secondary} />
            <li>
                <Divider />
            </li>
        </Fragment>
    ));

    return <List className={classes.root}>{structuredUserList}</List>;
};

ListOverflow.defaultProps = {
    emptyMessage: 'Empty List',
};

ListOverflow.propTypes = {
    rowProps: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            primary: PropTypes.string.isRequired,
            secondary: PropTypes.string,
        })
    ).isRequired,
    emptyMessage: PropTypes.string,
};

export default ListOverflow;
