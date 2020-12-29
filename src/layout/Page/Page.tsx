import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
});

/**
 * Wraps everything in the app style wise
 */
export default function Page({ children }: Props) {
    const classes = useStyles();
    return (
        <div id='page' className={classes.root}>
            {children}
        </div>
    );
}
