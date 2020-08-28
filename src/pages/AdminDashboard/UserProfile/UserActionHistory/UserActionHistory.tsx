import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import ListOverflow from '../../../../components/ListOverflow';

interface ActionHistory {
    id: string | number;
    primary: string;
    secondary: string;
}

export interface Props {
    ListsTraits: Array<ActionHistory>;
}

const UserActionHistory = ({ ListsTraits }: Props) => {
    let structuredActionHistory = null;

    if (ListsTraits.length !== 0) {
        structuredActionHistory = ListsTraits.map((row) => ({
            id: row.secondary,
            primary: row.primary,
            secondary: row.secondary,
        }));
    } else {
        return <Typography>No Action History</Typography>;
    }

    return (
        <Grid container direction='column' justify='flex-start' spacing={2}>
            <Grid item>
                <Typography>Action History</Typography>
            </Grid>
            <Grid item>
                <ListOverflow rowTraits={structuredActionHistory} />
            </Grid>
        </Grid>
    );
};

UserActionHistory.propTypes = {
    ListsTraits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            primary: PropTypes.string,
            secondary: PropTypes.string,
        })
    ).isRequired,
};

export default UserActionHistory;
