import * as React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FadeThrough from '@local/animations/FadeThrough';
import { useRouter } from 'next/router';
// import PasswordResetForm from '@local/domains/Auth/PasswordResetForm';
// TODO re-add password reset form

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            // boxShadow: theme.shadows[10],
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: 0,
        },
    },
}));

interface Props {
    token: string;
}

// TODO: verify token from the routing itself and don't render this component if there's no token, handle redirect in routing
export default function ForgotPasswordReset({ token }: Props) {
    const classes = useStyles();
    const router = useRouter();

    return (
        <FadeThrough animKey='forgot-pass-reset'>
            <Grid
                container
                direction='column'
                className={classes.root}
                alignContent='center'
                justify='center'
            >
                <Paper className={classes.paper}>
                    {/* <PasswordResetForm
                        token={token}
                        onSuccess={() => router.push('/login')}
                    /> */}
                </Paper>
            </Grid>
        </FadeThrough>
    );
}
