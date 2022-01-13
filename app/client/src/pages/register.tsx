import * as React from 'react';
import Image from 'next/image';
import { Grid, Paper, Link } from '@material-ui/core';
// import BackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { RegisterForm, useUser } from '@local/features/accounts';

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
        maxWidth: 425,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
    // avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main,
    // },
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

export default function RegisterPage() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/organizations/me');
    }, [user, router]);

    return (
        <Grid container alignItems='center' className={classes.root} justify='center'>
            <Grid item md={7}>
                <Image
                    src='/static/login_illustration.png' 
                    width={697}
                    height={383}
                    objectFit='contain'
                    alt='Register Illustration'
                />
            </Grid>
            <Grid item md={5} className={classes.formContainer}>
                <Paper className={classes.paper}>
                    <RegisterForm
                        onSuccess={() => router.push('/app/home')}
                        secondaryActions={
                            <Link href='/login' className={classes.link}>
                                Already have an account?
                            </Link>
                        }
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
