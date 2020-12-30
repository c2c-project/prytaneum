/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { motion, AnimationProps, MotionProps } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: { position: 'relative', width: '100%', height: '100%' },
    motion: { height: '100%', width: '100%', position: 'absolute' },
});

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    animKey: React.Key;
    className?: string;
}

export const growProps: AnimationProps & MotionProps = {
    initial: { transform: 'scale(0)' },
    exit: { transform: 'scale(0)' },
    animate: { transform: 'scale(1)' },
};

/**
 * This is a Page transition, hence the relative and absolute positionsing,
 * if you want to make a component just grow, import the growProps above and use
 * a motion.div
 */
export default function Grow({ children, animKey: key, className }: Props) {
    const classes = useStyles();
    return (
        <div
            className={
                className ? clsx([classes.root, className]) : classes.root
            }
        >
            <motion.div key={key} {...growProps} className={classes.motion}>
                {children}
            </motion.div>
        </div>
    );
}

Grow.defaultProps = {
    className: undefined,
};
