/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

import Paper from 'components/Paper';
import RegisterForm from 'domains/Auth/RegisterForm';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        // position: 'absolute',
        // top: '10%',
        // right: '45%',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default React.forwardRef<HTMLDivElement>(function RegisterPage(
    props,
    ref
) {
    const classes = useStyles();
    const history = useHistory();

    return (
        // <Container maxWidth='xs' className={classes.root}>
        <div ref={ref}>
            <Grid
                container
                direction='column'
                className={classes.root}
                alignContent='center'
                justify='center'
            >
                <Paper className={classes.paper}>
                    <RegisterForm
                        onSuccess={() => history.push('/auth/login')}
                    />
                </Paper>
            </Grid>
        </div>
        // </Container>
    );
});
