import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

interface Props {
    id?: string;
    text: string;
}

/** Returns the text in proper typography so it is consistent with the current theme throughout the app
 *  @category Component
 *  @constructor MessageItemText
 *  @param props
 *  @param {string} props.id The id of the wrapping <span>
 *  @param {string} props.text The text to return wrapped in \<Typography\>
 */
export default function MessageItemText({ id, text }: Props) {
    return (
        <span id={id}>
            <Typography variant='body1'>{text}</Typography>
        </span>
    );
}

MessageItemText.defaultProps = {
    id: 'MessageItemText',
};

MessageItemText.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string,
};
