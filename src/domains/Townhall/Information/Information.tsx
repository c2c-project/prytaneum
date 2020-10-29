import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { formatDate } from 'utils/format';
import SpeakerCard from '../SpeakerCard';
import { TownhallContext } from '../Contexts/Townhall';

function TownhallCard() {
    const townhall = React.useContext(TownhallContext);
    return (
        <Card elevation={10}>
            <CardHeader
                title={townhall.form.title}
                subheader={townhall.form.topic}
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemText disableTypography>
                                    <Typography variant='overline'>
                                        When
                                    </Typography>
                                    <Typography>
                                        {formatDate(townhall.form.date, 'P p')}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText disableTypography>
                                    <Typography variant='overline'>
                                        Description
                                    </Typography>
                                    <Typography>
                                        {townhall.form.description}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

export default function Information() {
    const classes = useStyles();
    const townhall = React.useContext(TownhallContext);

    return (
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <TownhallCard />
            </Grid>
            <Grid item xs={12} className={classes.title}>
                <Typography variant='h4'>Speakers</Typography>
            </Grid>
            {townhall.settings.speakers.list.map(
                ({ name, title, description, picture }, idx) => (
                    <Grid item xs={12} className={classes.item} key={idx}>
                        <SpeakerCard
                            title={name}
                            subtitle={title}
                            description={description}
                            image={picture}
                        />
                    </Grid>
                )
            )}
        </Grid>
    );
}
