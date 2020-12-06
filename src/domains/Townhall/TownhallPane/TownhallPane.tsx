import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SpeakerCard from 'domains/Speaker/SpeakerCard';
import { TownhallContext } from '../Contexts/Townhall';
import TownhallCard from '../TownhallCard';

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

export default function TownhallPane() {
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
