/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';

export default () => {
    const theme = useTheme();

    return (
        <motion.div
            layoutId='selected'
            initial={false}
            animate={{
                backgroundColor: theme.palette.primary.main,
            }}
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                borderRadius: 25,
                zIndex: -1,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};
