import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, Divider } from '@material-ui/core';
// import { FixedSizeList } from 'react-window';
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
    rowTraits: Array<{
        id: string | number;
        primary: string;
        secondary?: string;
    }>;
}

const ListOverflow = ({ rowTraits }: Props) => {
    const classes = useStyles();

    let structuredUserList = [];

    if (rowTraits.length !== 0) {
        structuredUserList = rowTraits.map((row) => (
            <Fragment key={row.id}>
                <ListCell primary={row.primary} secondary={row.secondary} />
                <li>
                    <Divider />
                </li>
            </Fragment>
        ));
    } else {
        return <h1>Empty List</h1>;
    }

    return <List className={classes.root}>{structuredUserList}</List>;
};

ListOverflow.propTypes = {
    rowTraits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            primary: PropTypes.string.isRequired,
            secondary: PropTypes.string,
        })
    ).isRequired,
};

export default ListOverflow;
