import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Townhall } from 'prytaneum-typings';
import clsx from 'clsx';

import SpeakerCard from 'domains/Speaker/SpeakerCard';
import useTownhall from 'hooks/useTownhall';
import TownhallCard from '../TownhallCard';

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: theme.spacing(2),
    },
    fullWidth: {
        width: '100%',
    },
    title: {
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
}));

interface Props {
    classes: ReturnType<typeof useStyles>;
    townhall: Townhall;
}

const TownhallPane = React.memo(({ classes, townhall }: Props) => {
    return (
        <Grid container direction='column' wrap='nowrap' alignItems='center'>
            <Grid item xs='auto' className={clsx(classes.item, classes.fullWidth)}>
                <TownhallCard />
            </Grid>
            {townhall.settings.speakers.list.length > 0 && (
                <>
                    <Grid item xs={12} className={classes.title}>
                        <Typography variant='h4'>Speakers</Typography>
                    </Grid>
                    {townhall.settings.speakers.list.map(({ name, title, description, picture }, idx) => (
                        <Grid item xs={12} className={classes.item} key={idx}>
                            <SpeakerCard title={name} subtitle={title} description={description} image={picture} />
                        </Grid>
                    ))}
                </>
            )}
        </Grid>
    );
});

const ContextSubscriber = () => {
    const classes = useStyles();
    const [townhall] = useTownhall();
    return <TownhallPane classes={classes} townhall={townhall} />;
};

export default ContextSubscriber;
