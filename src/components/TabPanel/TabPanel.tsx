import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
        },
        hidden: {
            visibility: 'hidden',
        },
    })
);

interface Props {
    visible: boolean;
    children: React.ReactNode | React.ReactNodeArray;
}
export default function TabPanel({ visible, children }: Props) {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.container, { [classes.hidden]: !visible })}
        >
            {children}
        </div>
    );
}

export function TabPanels({ children }: Pick<Props, 'children'>) {
    const classes = useStyles();
    return <div className={classes.root}>{children}</div>;
}
