import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar, makeStyles, Grid } from '@material-ui/core';

import { formatDate } from 'utils/format';

export interface Props {
    name: string;
    timestamp: string | number | Date;
    message: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        maxWidth: '100%',
    },
    avatar: {
        flex: 1,
    },
    content: {
        paddingLeft: theme.spacing(1),
    },
    bold: {
        fontWeight: 700,
    },
    message: {
        maxWidth: '100%',
    },
}));

/** @category Component
 *  @constructor Message
 *  @param props
 *  @param {string} props.name name of the author
 *  @param props.timestamp time of message send
 *  @param props.message the message that was sent
 */
export default function ChatMessage({ name, timestamp, message }: Props) {
    const classes = useStyles();
    return (
        <Grid container alignItems='flex-start' className={classes.root} wrap='nowrap'>
            <Grid item xs='auto'>
                <Avatar>{name[0].toUpperCase()}</Avatar>
            </Grid>
            <Grid container item xs='auto' className={classes.content} alignContent='flex-start'>
                <Grid item xs={12}>
                    <Typography variant='body2' display='inline' className={classes.bold}>
                        {name}
                    </Typography>
                    &nbsp;
                    <Typography variant='caption' color='textSecondary'>
                        {formatDate(timestamp, 'p')}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.message}>
                    <Typography>{message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

ChatMessage.propTypes = {
    name: PropTypes.string.isRequired,
};
