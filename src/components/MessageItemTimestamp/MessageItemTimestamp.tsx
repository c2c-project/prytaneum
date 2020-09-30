import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';

interface Props {
    id?: string;
    time: number;
}

/** Returns a timestamp in the 'hh:mm' using `Date(time)`
 *  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
 *  @category Component
 *  @constructor MessageItemTimestamp
 *  @param props
 *  @param {string} props.id The id of the wrapping <span>
 *  @param {number} props.time Returns a 'hh:mm' date formulated from time
 */
export default function MessageItemTimestamp({ id, time }: Props) {
    return (
        <span id={id}>
            <Typography variant='body1'>
                {format(new Date(time), 'hh:mm')}
            </Typography>
        </span>
    );
}

MessageItemTimestamp.defaultProps = {
    id: 'MessageItemTimestamp',
};

MessageItemTimestamp.propTypes = {
    time: PropTypes.number.isRequired,
};
