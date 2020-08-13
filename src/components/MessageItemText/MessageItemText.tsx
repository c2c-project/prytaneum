import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

interface Props {
    text: string;
}

/** Returns the text in proper typography so it is consistent with the current theme throughout the app
 *  @category Component
 *  @constructor MessageItemText
 *  @param props
 *  @param {string} props.text The text to return wrapped in \<Typography\>
*/
export default function MessageItemText({ text }: Props) {
    return <Typography variant='body1'>{text}</Typography>;
}

MessageItemText.propTypes = {
    text: PropTypes.string.isRequired,
};
