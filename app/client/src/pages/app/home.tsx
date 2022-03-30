import * as React from 'react';
import { Paper, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { OrgForm } from '@local/features/organizations';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container justifyContent='center' alignItems='center'>
            <Grid component={Paper} className={classes.paper} item>
                <OrgForm onSubmit={() => {}} />
            </Grid>
        </Grid>
    );
};

export default Home;
