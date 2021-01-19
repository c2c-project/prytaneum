import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

// time in ms it takes a component to exit
const exitTime = 150;
const useStyles = makeStyles(
    createStyles({
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
            transition: `opacity 200ms ease-in-out ${exitTime - 50}ms, transform 200ms ease-in-out ${exitTime - 50}ms`,
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
    })
);

export interface Props {
    visible: boolean;
    children: React.ReactNode | React.ReactNodeArray;
    classes: ReturnType<typeof useStyles>;
}
const TabPanel = React.memo(({ visible, children, classes }: Props) => {
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
});

const useRootStyles = makeStyles(
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            position: 'relative',
        },
    })
);

export function TabPanels({ children }: Pick<Props, 'children'>) {
    const classes = useRootStyles();
    return <div className={classes.root}>{children}</div>;
}

const TabPanelContextSubscriber = ({ visible, children }: Omit<Props, 'classes'>) => {
    const classes = useStyles();
    return (
        <TabPanel visible={visible} classes={classes}>
            {children}
        </TabPanel>
    );
};

export default React.memo(TabPanelContextSubscriber);
