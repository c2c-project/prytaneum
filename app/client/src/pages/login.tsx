import * as React from 'react';
import Image from 'next/image';
import { Grid, Button, Paper, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { LoginForm, useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
        flexGrow: 1,
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 20
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
    link: {
        textAlign: 'center',
        color: 'grey',
        textDecoration: 'underline',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    }
}));

export default function Login() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/app/home');
    }, [user, router]);

    return (
        <Grid container alignItems='center' className={classes.root} justify='center'>
            <Grid item md={7}>
                <Image
                    src='https://i.ibb.co/wg4Cyn1/login-illustration.png' 
                    width={697}
                    height={383}
                    objectFit='contain'
                />
            </Grid>
            <Grid item md={5} className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <LoginForm
                        onSuccess={() => router.push('/app/home')}
                        secondaryActions={
                            <Link href='/register' className={classes.link}>
                                Or, register an account
                            </Link>
                        }
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
