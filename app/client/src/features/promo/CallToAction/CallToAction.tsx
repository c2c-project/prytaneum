import * as React from 'react';
import Image from 'next/image';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    landing: {
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            minHeight: '90vh',
        },
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
        [theme.breakpoints.down('md')]: {
            marginTop: 50,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 35,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 20,
        },
    },
    subtitle: {
        textAlign: 'right',
        color: '#272C6C',
        [theme.breakpoints.down('md')]: {
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
        fontSize: 24,
        [theme.breakpoints.down('md')]: {
            alignSelf: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 0,
            width: '100%',
            fontSize: 20,
        },
    },
    arrowsection: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    downarrow: {
        fontSize: '4rem',
        transform: 'rotate(-90deg)'
    }
}));

export function CallToAction() {
    const classes = useStyles();
    const router = useRouter();
    const [user] = useUser();

    return (
        <>
            <Grid item xs={12} md={6} className={classes.header}>
                <div className={classes.title}>
                    <Image
                        src='/static/prytaneum_logo2.svg' 
                        width={3483}
                        height={665}
                        objectFit='contain'
                    />
                </div>
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
            <Grid item xs={12} md={6}>
                <Image
                    src='/static/prytaneum_landing_graphic.svg' 
                    width={3292}
                    height={2097}
                    objectFit='contain'
                />
            </Grid>
        </>
    );
}