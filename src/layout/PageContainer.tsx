import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100%'
    }
}));

// eslint-disable-next-line
export default function PageContainer({ children }) {
    const classes = useStyles();
    return <div className={classes.content}>{children}</div>;
}
