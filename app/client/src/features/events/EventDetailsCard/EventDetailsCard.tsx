import * as React from 'react';
import { IconButton, Card, CardHeader, Collapse, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import { useEvent } from '@local/hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

interface Props {
    className?: string;
}

export function EventDetailsCard({ className }: Props) {
    const [{ topic, title, description }] = useEvent();
    const classes = useStyles();
    const [isIn, setIsIn] = React.useState(false);

    return (
        <div className={clsx(classes.root, className)}>
            <Card elevation={0}>
                <CardHeader
                    title={title}
                    subheader={topic}
                    action={
                        <IconButton
                            className={clsx(classes.expand, { [classes.expandOpen]: isIn })}
                            aria-label='show more'
                            onClick={() => setIsIn((prev) => !prev)}
                        >
                            <ExpandIcon />
                        </IconButton>
                    }
                />
                <Collapse in={isIn}>
                    <CardContent>{description}</CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

EventDetailsCard.defaultProps = {
    className: undefined,
};
