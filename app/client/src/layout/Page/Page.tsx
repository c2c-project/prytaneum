import * as React from 'react';

import makeStyles from '@mui/styles/makeStyles';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 100%',
        overflowY: 'auto',
        overscrollBehavior: 'none',
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
