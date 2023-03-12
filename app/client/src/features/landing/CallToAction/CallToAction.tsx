import * as React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        },
    },
    subtitle: {
        textAlign: 'right',
        color: '#D79922',
        [theme.breakpoints.down('lg')]: {
            textAlign: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
        },
        fontWeight: 500,
        fontSize: 25,
    },
    text: {
        textAlign: 'right',
        color: '#272C6C',
        fontFamily: 'Manrope',
        fontWeight: 400,
        fontSize: 20,
    },
    button: {
        color: 'white',
        backgroundColor: '#2427B7',
        borderRadius: 12,
        height: '100%',
        width: 'auto',
        justifySelf: 'end',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 20,
        paddingRight: 20,
    },
    secondaryButton: {
        backgroundColor: '#ED526C',
        borderRadius: 12,
        color: 'white',
        padding: '3px 20px 3px 20px',
    },
}));

export function CallToAction() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Grid item xs={12} md={6} className={classes.header}>
                <Image
                    alt='Prytaneum Landing Graphic'
                    src='/static/prytaneum_landing_graphic.svg'
                    width={3292}
                    height={2097}
                    objectFit='contain'
                />
            </Grid>
            <Grid item xs={12} md={6} marginLeft={-16} marginTop={-13}>
                <Image
                    data-test-id='landing-prytanum-logo'
                    alt='Prytaneum Logo'
                    src='/static/p_logo.svg'
                    width={3483}
                    height={665}
                    objectFit='contain'
                />
                <Typography variant='h5' className={classes.subtitle} marginTop={-1}>
                    A crucial tool for a better democracy.
                </Typography>
                <Grid item marginLeft={14} marginTop={2}>
                    <Typography variant='h6' className={classes.text}>
                        This town hall platform leverages AI and big data to enable meaningful democratic engagement between residents and public officials.
                    </Typography>
                </Grid>
                <Grid container marginLeft={30} marginTop={3}>
                    <Grid item marginRight={3}>
                        <Button className={classes.button} onClick={() => router.push('/guides/getting-started')}>
                            Get Started
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.secondaryButton}>
                            See How It Works
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
