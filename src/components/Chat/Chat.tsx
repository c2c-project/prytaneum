import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { Props as ChatContentProps } from 'components/ChatContent';
import { Props as ChatbarProps } from 'components/Chatbar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(1.5),
    },
}));

interface Props {
    children: React.ReactElement<ChatContentProps | ChatbarProps>[];
    className?: string;
}

export default function Chat({ children, className }: Props) {
    const classes = useStyles();
    return (
        <Grid
            container
            direction='column'
            className={clsx(className, classes.root)}
            wrap='nowrap'
            component={Paper}
        >
            {children}
        </Grid>
    );
}

Chat.defaultProps = {
    className: undefined,
};
