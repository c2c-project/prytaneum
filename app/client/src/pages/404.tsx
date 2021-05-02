import * as React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    errorMessage?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        
    },
    secondary: {
        fontWeight: 100,
    },
    spacing: {
        marginBottom: theme.spacing(3),
    },
}));

export default function NotFound({ errorMessage }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify='center' direction='column' alignContent='stretch'>
                <Grid container justify='center'>
                    <Typography variant='h3' color='error' display='inline'>
                        404
                    </Typography>
                    &nbsp;
                    <Typography className={classes.secondary} variant='h3' display='inline'>
                        Not found
                    </Typography>
                </Grid>
                <Divider variant='middle' className={classes.spacing} />
                <Grid container justify='center' className={classes.spacing}>
                    <Typography variant='subtitle2' component='div'>
                        Please check the link and try again
                    </Typography>
                </Grid>
                {errorMessage && (
                    <Grid container justify='center'>
                        <Typography>
                            We received the following error: &nbsp;
                            <b>{errorMessage}</b>
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

NotFound.defaultProps = {
    errorMessage: undefined,
};
