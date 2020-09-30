import React from 'react';
import PropTypes from 'prop-types';
import Bold from '../Bold';

interface Props {
    name: string;
}

/** Returns the Author's name in Bold
 *  @category Component
 *  @constructor MessageItemAuthor
 *  @param props
 *  @param {string} props.name The name to return in Bold
*/
export default function MessageItemAuthor({ name }: Props) {
    return <Bold>{`${name}:`}</Bold>;
}

MessageItemAuthor.propTypes = {
    name: PropTypes.string.isRequired,
};
