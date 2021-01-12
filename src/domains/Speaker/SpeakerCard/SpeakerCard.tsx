import React from 'react';
import { Card, CardHeader, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    media: {
        width: '100%',
        height: 'auto',
        clipPath: theme.custom.clipPath.slope,
        flex: '1 0 100%',
    },
    header: {
        flex: '1 0 100%',
    },
    content: {
        flex: '1 0 100%',
    },
}));

interface SpeakerCardProps {
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

export default function SpeakerCard({
    image,
    title,
    subtitle,
    description,
}: SpeakerCardProps) {
    const classes = useStyles();
    return (
        <Card classes={{ root: classes.root }}>
            <CardMedia
                classes={{ root: classes.media }}
                component='img'
                src={image}
            />
            <CardHeader
                className={classes.header}
                title={title}
                subheader={subtitle}
            />
            <CardContent className={classes.content}>{description}</CardContent>
        </Card>
    );
}
