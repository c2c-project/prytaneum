import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Fab, Paper } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    picture: {
        width: '100%',
        height: 'auto',
    },
    fabIcon: {
        color: 'white',
    },
    fab: {
        paddingRight: '10%',
        marginTop: '-10%',
    },
    paper: {
        borderRadius: '50px 50px 0px 0px',
        height: '100%',
        minHeight: '',
    },
}));

interface Props {
    townhall: {
        speaker: string;
        moderator: string;
        topic: string;
        picture: string;
        readingMaterials: '';
        date: Date;
    };
}

export default function TownhallPre({ townhall }: Props) {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs='auto'>
                <div
                    style={{
                        backgroundImage: `url(${townhall.picture})`,
                        backgroundSize: '100% auto',
                        height: '40%',
                        width: '100vw',
                    }}
                    // className={classes.picture}
                    // src={townhall.picture}
                    // alt='Member of Congress'
                />
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '40%' }}>
                <Paper className={classes.paper}>Hello World</Paper>
            </Grid>
        </Grid>
    );
}
