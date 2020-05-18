import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function MessageItemText({ text }) {
    return <Typography variant='body1'>{text}</Typography>;
}

MessageItemText.propTypes = {
    text: PropTypes.string.isRequired,
};
