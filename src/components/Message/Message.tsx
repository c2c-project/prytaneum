import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Avatar,
    Grid /* Menu, MenuItem */,
} from '@material-ui/core';

import { formatDate } from 'utils/format';

interface Props {
    name: string;
    timestamp: string | number | Date;
    message: string;
}

/** @category Component
 *  @constructor Message
 *  @param props
 *  @param {string} props.name name of the author
 *  @param props.timestamp time of message send
 *  @param props.message the message that was sent
 */
export default function Message({ name, timestamp, message }: Props) {
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
                <Grid
                    item
                    xs={12}
                    // onContextMenu={(e) => {
                    //     e.preventDefault();
                    // }}
                >
                    <Typography>{message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

Message.propTypes = {
    name: PropTypes.string.isRequired,
};
