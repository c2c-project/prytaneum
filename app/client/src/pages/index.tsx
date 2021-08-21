import * as React from 'react';
import { Grid, Typography, Button, Paper, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { LoginForm, useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        maxWidth: 425,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    header: {
        marginBottom: 50,
    },
    title: {
        fontWeight: 400,
    },
    subtitle: {
        textTransform: 'uppercase',
    },
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/app/home');
    }, [user, router]);

    return (
        <Grid container alignContent='center' className={classes.root} justify='center' spacing={2}>
            <Grid item xs={12} sm={12} md={6} className={classes.header}>
                <Typography variant='h1' className={classes.title}>
                    P
                </Typography>
                <Typography variant='h5' className={classes.subtitle}>
                    A crucial tool<br/>
                    for a <b>better democracy</b>
                </Typography>
            </Grid>
            <Hidden smDown>    
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <LoginForm
                            onSuccess={() => router.push('/app/home')}
                            secondaryActions={
                                <Button fullWidth variant='outlined' onClick={() => router.push('/register')}>
                                    Register
                                </Button>
                            }
                        />
                    </Paper>
                </Grid>
            </Hidden>
            <Grid item sm={12} md={6}>
                <Typography variant='h6'>
                    Mission Statement
                </Typography>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Scelerisque eu ultrices vitae auctor eu augue ut lectus.
                </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
                <Typography variant='h6'>
                    Capabilities
                </Typography>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Scelerisque eu ultrices vitae auctor eu augue ut lectus.
                </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
                <Typography variant='h6'>
                    Where We've Been Used
                </Typography>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Scelerisque eu ultrices vitae auctor eu augue ut lectus.
                </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
                <Typography variant='h6'>
                    Features
                </Typography>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Scelerisque eu ultrices vitae auctor eu augue ut lectus.
                </Typography>
            </Grid>
        </Grid>
    );
}
