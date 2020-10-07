import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { UserActionHistoryFormat } from 'domains/AdminDashboard/types';

import ListOverflow from 'components/ListOverflow';

export interface Props {
    ListsTraits: UserActionHistoryFormat[];
}

const UserActionHistory = ({ ListsTraits }: Props) => {
    return (
        <Grid container direction='column' justify='flex-start' spacing={2}>
            <Grid item>
                <Typography>Action History</Typography>
            </Grid>
            <Grid item>
                <ListOverflow
                    rowTraits={ListsTraits}
                    emptyMessage='No Action History'
                />
            </Grid>
        </Grid>
    );
};

UserActionHistory.propTypes = {
    ListsTraits: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            primary: PropTypes.string,
            secondary: PropTypes.string,
        })
    ).isRequired,
};

export default UserActionHistory;
