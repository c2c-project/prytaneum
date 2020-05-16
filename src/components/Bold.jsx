import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line
export default function Bold({ children }) {
    return (
        <Typography component='div'>
            <Box fontWeight='fontWeightBold'>{children}</Box>
        </Typography>
    );
}
