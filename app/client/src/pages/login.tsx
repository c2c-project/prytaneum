import * as React from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { LoginForm, useUser } from '@local/features/accounts';

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
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return (
        <Grid container alignContent='center' className={classes.root} justify='center'>
            <Paper className={classes.paper}>
                <LoginForm
                    onSuccess={() => router.push('/organizations/me')}
                    secondaryActions={
                        <Button fullWidth variant='outlined' onClick={() => router.push('/register')}>
                            Register
                        </Button>
                    }
                />
            </Paper>
        </Grid>
    );
}
