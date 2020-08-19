import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

interface Props {
    children: JSX.Element | JSX.Element[] | string;
}

/**
 * Bolds the children, while keeping typography intact
 * @constructor Bold
 * @category Component
 * @param props holds props.children
 * @param {JSX.Element | JSX.Element[] | string} props.children props.children has the element to bold
 */
export default function Bold({ children }: Props) {
    return (
        <Typography component='div'>
            <Box fontWeight='fontWeightBold'>{children}</Box>
        </Typography>
    );
}

Bold.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
