import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

interface Props {
    text: string;
}

export default function MessageItemText({ text }: Props) {
    return <Typography variant='body1'>{text}</Typography>;
}

MessageItemText.propTypes = {
    text: PropTypes.string.isRequired,
};
