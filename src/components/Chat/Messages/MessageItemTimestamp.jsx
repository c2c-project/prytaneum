import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const format = (time) => {
    return time;
};

export default function MessageItemTimestamp({ time }) {
    return <Typography variant='body1'>{format(time)}</Typography>;
}

MessageItemTimestamp.propTypes = {
    time: PropTypes.number.isRequired,
};
