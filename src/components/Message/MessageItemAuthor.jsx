import React from 'react';
import PropTypes from 'prop-types';
import Bold from '../Bold';

export default function MessageItemAuthor({ name }) {
    return <Bold>{`${name}:`}</Bold>;
}

MessageItemAuthor.propTypes = {
    name: PropTypes.string.isRequired,
};
