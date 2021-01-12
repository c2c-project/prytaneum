import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

// time in ms it takes a component to exit
const exitTime = 150;
const useStyles = makeStyles(
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            position: 'relative',
        },
        container: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            position: 'absolute',
            display: 'none',
        },
        visible: {
            display: 'unset',
        },
        enter: {
            opacity: 0,
            transform: 'scale(.92)',
        },
        enterActive: {
            opacity: 1,
            transform: 'scale(1)',
            transition: `opacity 200ms ease-in-out ${
                exitTime - 50
            }ms, transform 200ms ease-in-out ${exitTime - 50}ms`,
        },
        enterDone: {},
        exit: {
            opacity: 1,
        },
        exitActive: {
            opacity: 0,
            transition: `opacity ${exitTime}ms ease-in-out`,
        },
        exitDone: {
            display: 'none',
        },
        // exit: {
        //     animation: `$fadeThroughExit ${exitTime}ms ease-in-out`,
        //     animationFillMode: 'forwards',
        // },
        // enter: {
        //     animation: `$fadeThroughEnter 200ms ease-in-out ${exitTime - 50}ms`,
        //     animationFillMode: 'forwards',
        // },
        // hide: {
        //     display: 'none',
        // },
        // '@keyframes fadeThroughEnter': {
        //     '0%': {
        //         transform: 'scale(0.92)',
        //         opacity: 0,
        //         visibility: 'visible',
        //     },
        //     '100%': {
        //         transform: 'scale(1)',
        //         opacity: 1,
        //         visibility: 'visible',
        //     },
        // },
        // '@keyframes fadeThroughExit': {
        //     '0%': {
        //         opacity: 1,
        //         visibility: 'visible',
        //     },
        //     '100%': {
        //         opacity: 0,
        //         visibility: 'hidden',
        //         display: 'none',
        //     },
        // },
    })
);

export interface Props {
    visible: boolean;
    children: React.ReactNode | React.ReactNodeArray;
}
function TabPanel({ visible, children }: Props) {
    const classes = useStyles();
    return (
        <CSSTransition
            timeout={400}
            in={visible}
            appear
            classNames={{
                appear: clsx(classes.enter, classes.visible),
                appearActive: clsx(classes.enterActive, classes.visible),
                appearDone: clsx(classes.enterDone, classes.visible),
                enter: clsx(classes.enter, classes.visible),
                enterActive: clsx(classes.enterActive, classes.visible),
                enterDone: clsx(classes.enterDone, classes.visible),
                exit: clsx(classes.exit, classes.visible),
                exitActive: clsx(classes.exitActive, classes.visible),
                exitDone: classes.exitDone,
            }}
        >
            <div className={classes.container}>{children}</div>
        </CSSTransition>
    );
}

export function TabPanels({ children }: Pick<Props, 'children'>) {
    const classes = useStyles();
    return <div className={classes.root}>{children}</div>;
}

export default React.memo(TabPanel);
