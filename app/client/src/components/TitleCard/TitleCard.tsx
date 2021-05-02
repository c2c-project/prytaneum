/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    ListItem,
    List,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    Hidden,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(0, 0, 4, 0),
            display: 'flex',
            height: '100%',
            width: '100%',
            maxHeight: 225,
            minHeight: 150,
        },
        card: {
            display: 'flex',
            flex: 1,
        },
        content: {
            flexDirection: 'column',
            display: 'flex',
            flexWrap: 'wrap',
            width: 'content',
            justifyContent: 'center',
            alignContent: 'center',
        },
        item: {
            margin: theme.spacing(0.5),
            flex: 1,
            flexBasis: '27%',
        },
        numbers: {
            color: theme.palette.primary.light,
            fontWeight: 800,
        },

        media: {
            position: 'relative',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            [theme.breakpoints.up('sm')]: {
                width: '70%',
            },
            backgroundColor: theme.palette.primary.main,
        },
        container: {
            alignSelf: 'center',
        },
        title: {
            color: theme.palette.primary.contrastText,
            position: 'absolute',
            bottom: theme.spacing(3),
            left: theme.spacing(3),
            fontSize: '3em',
        },
    })
);

interface Props {
    // [name, number]
    stats?: [string, number][];
    statsTitle?: string;
    title: string;
}

export default function TitleCard({ stats, title, statsTitle }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card raised className={classes.card}>
                <CardMedia className={classes.media}>
                    <Typography className={classes.title}>{title}</Typography>
                </CardMedia>
                <Hidden xsDown>
                    <CardContent className={classes.content}>
                        <List>
                            <ListSubheader>{statsTitle}</ListSubheader>
                            {stats &&
                                stats.map(([name, number]) => (
                                    <ListItem
                                        key={JSON.stringify([name, number])}
                                    >
                                        <ListItemIcon
                                            className={classes.numbers}
                                        >
                                            {number}
                                        </ListItemIcon>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                            }}
                                            primary={name}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </CardContent>
                </Hidden>
            </Card>
        </div>
    );
}

TitleCard.defaultProps = {
    stats: undefined,
    statsTitle: undefined,
};
