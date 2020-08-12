/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Fab,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    Zoom,
    Paper,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ForumIcon from '@material-ui/icons/ForumOutlined';

import { formatDate } from 'utils/format';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    picture: {
        width: '100%',
        height: 'auto',
        borderRadius: '0 0 50px 50px',
    },
    fabIcon: {
        color: 'white',
    },
    fab: {
        paddingRight: theme.spacing(4),
        marginTop: -theme.spacing(4),
    },
    color: {
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        height: '100%',
        width: '100%',
        padding: `0px ${theme.spacing(2)}px 0px ${theme.spacing(6)}px`,
    },
}));

interface Props {
    townhall: {
        speaker: {
            name: string;
            party: string;
            territory: string;
        };
        moderator: string;
        topic: string;
        picture: string;
        readingMaterials: '';
        date: Date;
    };
}
export default function TownhallPre({ townhall }: Props) {
    const classes = useStyles();
    const Title = () => (
        <Grid container spacing={0} item xs={12}>
            <Grid item xs={12}>
                <Typography variant='h5'>{townhall.speaker.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary'>
                    {`${townhall.speaker.party}, ${townhall.speaker.territory}`}
                </Typography>
            </Grid>
        </Grid>
    );
    const FavoriteFab = () => (
        <Grid container>
            <Grid
                container
                justify='flex-end'
                item
                xs={12}
                className={classes.fab}
            >
                <Zoom in>
                    <Fab color='secondary'>
                        <FavoriteIcon className={classes.fabIcon} />
                    </Fab>
                </Zoom>
            </Grid>
        </Grid>
    );
    const Info = () => (
        <Grid container>
            <Grid item xs={12}>
                <List>
                    <ListSubheader disableGutters disableSticky>
                        Information
                    </ListSubheader>
                    <ListItem disableGutters>
                        <ListItemIcon>
                            <ForumIcon style={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText primary={townhall.topic} />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemIcon>
                            <CalendarIcon style={{ fontSize: 30 }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={formatDate(
                                townhall.date,
                                'MMMM do, yyyy p'
                            )}
                        />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs='auto' className={classes.color}>
                <img
                    className={classes.picture}
                    src={townhall.picture}
                    alt='Member of Congress'
                />
            </Grid>
            <Paper className={classes.paper} elevation={0}>
                <FavoriteFab />
                <Title />
                <Info />
            </Paper>
        </Grid>
    );
}
