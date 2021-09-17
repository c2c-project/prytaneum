import * as React from 'react';
import { useRouter } from 'next/router';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { OrgForm } from '@local/features/organizations';
import { useUser } from '@local/features/accounts';

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
    const router = useRouter();
    const [user] = useUser();
    const classes = useStyles();
    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    });
    return (
        <Grid className={classes.root} container justify='center' alignItems='center'>
            <Grid component={Paper} className={classes.paper} item>
                <OrgForm onSubmit={() => console.log('yo')} />
            </Grid>
        </Grid>
    );
};

export default Home;
