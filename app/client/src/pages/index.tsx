import * as React from 'react';
import Image from 'next/image';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '85vh',
    },
    header: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center'
        },
    },
    title: {
        fontWeight: 400,
        fontSize: 140,
        color: '#272C6C',
        [theme.breakpoints.down('md')]: {
            fontSize: 100
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 110
        },
        [theme.breakpoints.down('xs')]: {
            fontWeight: 500,
            fontSize: 56
        },
    },
    subtitle: {
        textAlign: 'right',
        color: '#272C6C',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        },
    },
    button: {
        marginTop: 20,
        minWidth: 300,
        alignSelf: 'flex-start',
        backgroundColor: '#ED526C',
        '&:hover': {
            backgroundColor: '#C7374F',
        },
        fontSize: 24,
        color: '#FFF',
        [theme.breakpoints.down('xs')]: {
            minWidth: 0,
            width: '100%',
            fontSize: 20,
        },
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center'
        },
    }
}));

export default function Home() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/app/home');
    }, [user, router]);

    return (
        <Grid container alignItems='center' className={classes.root} justify='center' spacing={2}>
            <Grid item xs={12} sm={12} md={6} className={classes.header}>
                <Typography variant='h1' className={classes.title}>
                    Prytaneum
                </Typography>
                <Typography variant='h5' className={classes.subtitle}>
                    A crucial tool for a better democracy.
                </Typography>
                {user ? 
                    <Button variant='contained' color='secondary' className={classes.button} onClick={() => router.push('/app/home')}>
                        Go to Dashboard
                    </Button>
                    : 
                    <Button variant='contained' color='secondary' className={classes.button} onClick={() => router.push('/register')}>
                        Register
                    </Button>
                }
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Image
                    src='https://i.ibb.co/zhxkrc2/landing-illustration.png' 
                    width={820}
                    height={591}
                    objectFit='contain'
                />
            </Grid>
        </Grid>
    );
}
