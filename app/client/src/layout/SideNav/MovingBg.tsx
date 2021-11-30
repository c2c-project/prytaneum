/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

export const MovingBg = () => {
    const theme = useTheme();

    return (
        <motion.div
            layoutId='selected'
            initial={false}
            animate={{
                backgroundColor: theme.palette.secondary.main,
            }}
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                borderRadius: 25,
                zIndex: -1,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};
