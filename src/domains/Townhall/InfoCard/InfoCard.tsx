import React from 'react';
import { IconButton, Card, CardHeader, Collapse, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import useTownhall from 'hooks/useTownhall';

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

export default function InfoCard({ className }: Props) {
    const [townhall] = useTownhall();
    const classes = useStyles();
    const [isIn, setIsIn] = React.useState(false);

    return (
        <div className={clsx(classes.root, className)}>
            <Card elevation={0}>
                <CardHeader
                    title={townhall.form.title}
                    subheader={townhall.form.topic}
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
                    <CardContent>{townhall.form.description}</CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

InfoCard.defaultProps = {
    className: undefined,
};
