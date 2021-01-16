/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { motion, AnimationProps, MotionProps } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    motion: { top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' },
});

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    animKey: React.Key;
}

export const fadeThroughProps: AnimationProps & MotionProps = {
    initial: { scale: 0.92, opacity: 0 },
    exit: { scale: 1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
        ease: 'easeInOut',
    },
};

export default function FadeThrough({ children, animKey: key }: Props) {
    const classes = useStyles();
    return (
        <motion.div key={key} {...fadeThroughProps} className={classes.motion}>
            {children}
        </motion.div>
    );
}
