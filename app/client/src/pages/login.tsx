import * as React from 'react';
import { Grid, Typography, Avatar, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
// import { fetchQuery } from 'react-relay';
import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';

// import { USER_QUERY } from '@local/contexts/User';
// import { makeServerFetchFunction, initServerEnvironment } from '@local/utils/relay-environment';
// import { initializeStore } from '@local/reducers/store';
import { LoginForm } from '@local/features/accounts';
import { useUser } from '@local/hooks/useUser';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 425,
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
}));

export default function Login() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/app/home');
    }, [user, router]);

    return (
        <Grid container alignContent='center' className={classes.root} justify='center'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <div className={classes.form}>
                    <LoginForm onSuccess={() => router.push('/app/home')} />
                </div>
            </Paper>
        </Grid>
    );
}
