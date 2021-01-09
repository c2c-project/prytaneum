import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
            inset: 0,
            position: 'absolute',
            visibility: 'hidden',
            opacity: 0,
        },
        exit: {
            animation: `$fadeThroughExit ${exitTime}ms ease-in-out`,
            animationFillMode: 'fowards',
        },
        enter: {
            animation: `$fadeThroughEnter 200ms ease-in-out ${exitTime}ms`,
            animationFillMode: 'forwards',
        },
        '@keyframes fadeThroughEnter': {
            '0%': {
                transform: 'scale(0.92)',
                opacity: 0,
                visibility: 'visible',
            },
            '100%': {
                transform: 'scale(1)',
                opacity: 1,
                visibility: 'visible',
            },
        },
        '@keyframes fadeThroughExit': {
            '0%': {
                opacity: 1,
                visibility: 'visible',
            },
            '100%': {
                opacity: 0,
                visibility: 'hidden',
                display: 'none',
            },
        },
    })
);

export interface Props {
    visible: boolean;
    children: React.ReactNode | React.ReactNodeArray;
}
function TabPanel({ visible, children }: Props) {
    const classes = useStyles();
    const previouslyVisible = React.useRef(visible);
    const shouldExitPlay = React.useMemo(
        () =>
            // if it's currently not visible and was previously visible
            !visible && previouslyVisible.current === true,
        [visible]
    );

    // update visibility, okay to be updated every render,
    // but it must be updated after calculating the above
    previouslyVisible.current = visible;

    return (
        <div
            className={clsx(classes.container, {
                [classes.exit]: shouldExitPlay,
                [classes.enter]: visible,
            })}
        >
            {children}
        </div>
    );
}

export function TabPanels({ children }: Pick<Props, 'children'>) {
    const classes = useStyles();
    return <div className={classes.root}>{children}</div>;
}

export default React.memo(TabPanel);
