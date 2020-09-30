import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface Props {
    errorMessage: string;
}

export default function InvalidLink({ errorMessage }: Props) {
    return (
        <Grid container justify='center' direction='column'>
            <Grid container justify='center'>
                <Typography variant='h4' component='div' color='error'>
                    {errorMessage}
                </Typography>
            </Grid>
            <Grid container justify='center'>
                <Typography variant='subtitle2' component='div'>
                    Please check the link and try again
                </Typography>
            </Grid>
        </Grid>
    );
}
