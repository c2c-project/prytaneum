import React from 'react';
import PropTypes from 'prop-types';
import Bold from '../Bold';

interface Props {
    name: string;
}
export default function MessageItemAuthor({ name }: Props) {
    return <Bold>{`${name}:`}</Bold>;
}

MessageItemAuthor.propTypes = {
    name: PropTypes.string.isRequired,
};
