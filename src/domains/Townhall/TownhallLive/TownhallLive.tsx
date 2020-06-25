import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Paper from 'components/Paper';
import VideoPlayer from 'components/VideoPlayer';
import { TownhallContext } from '../Contexts/Townhall';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: theme.custom.borderRadius,
        padding: theme.spacing(3),
    },
}));

export default function TownhallLive() {
    const townhall = React.useContext(TownhallContext);
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <VideoPlayer url={townhall.url} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => console.log('TODO')}
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Ask a Question
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
