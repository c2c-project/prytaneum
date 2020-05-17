import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Bold from '../../Bold';

export default function MessageItemAuthor({ name }) {
    return (
        <Bold>
            <Typography variant='body1'>{name}</Typography>
        </Bold>
    );
}

MessageItemAuthor.propTypes = {
    name: PropTypes.string.isRequired
}
