import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import theme from '../../theme';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '2%',
            backgroundColor: theme.palette.primary.main,
            '& h1': {
                color: 'white',
            },
            '& p': {
                color: 'white',
            },
        },
        duration: {
            color: 'white',
        },
        cardActions: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
    })
);

interface ClipData {
    timeStamp: string;
    duration: string;
    title: string;
    description: string;
    tags: string[];
}

export default function ClipDetails({duration, title, description, tags}: ClipData) {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant='outlined'>
            <h1>
                Current:
                {title}
            </h1>
            <h2 className={classes.duration}>{duration}</h2>
            <p>
                Tags:
                {tags.join()}
            </p>
            <div className={classes.cardActions}>
                <Button variant='contained' color='secondary'>
                    Play
                </Button>
                <Button variant='contained' color='secondary'>
                    Edit
                </Button>
            </div>
        </Card>
    );
}
