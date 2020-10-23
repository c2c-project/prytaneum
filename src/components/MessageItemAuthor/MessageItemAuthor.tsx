import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar, Grid } from '@material-ui/core';

import { formatDate } from 'utils/format';

interface Props {
    name: string;
    timestamp: string | number | Date;
    message: string;
}

/** Returns the Author's name in Bold
 *  @category Component
 *  @constructor MessageItemAuthor
 *  @param props
 *  @param {string} props.name The name to return in Bold
 */
export default function MessageItemAuthor({ name, timestamp, message }: Props) {
    return (
        <Grid
            container
            alignItems='flex-start'
            style={{ paddingBottom: '8px' }}
        >
            <Grid item xs='auto'>
                <Avatar>{name[0].toUpperCase()}</Avatar>
            </Grid>
            <Grid
                container
                item
                xs='auto'
                style={{ flex: 1, paddingLeft: '8px' }}
                alignContent='flex-start'
            >
                <Grid item xs={12}>
                    <Typography
                        variant='body2'
                        display='inline'
                        style={{ fontWeight: 700 }}
                    >
                        {name}
                    </Typography>
                    &nbsp;
                    <Typography variant='caption' color='textSecondary'>
                        {formatDate(timestamp, 'M/dd/yy p')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

MessageItemAuthor.propTypes = {
    name: PropTypes.string.isRequired,
};
