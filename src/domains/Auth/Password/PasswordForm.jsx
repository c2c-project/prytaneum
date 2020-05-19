import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
});

export default function PasswordForm({ onSubmit }) {
    const classes = useStyles();
    const history = useHistory();
    const [form, setForm] = React.useState({
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e, id) => {
        e.preventDefault();
        const { value } = e.target;
        setForm((state) => ({ ...state, [id]: value }));
    };
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
            }}
        >
            <Grid
                container
                spacing={2}
                className={classes.root}
                alignContent='center'
            >
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        type='password'
                        value={form.password}
                        onChange={(e) => handleChange(e, 'password')}
                        label='Password'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        variant='outlined'
                        type='password'
                        value={form.confirmPassword}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                        label='Confirm Password'
                    />
                </Grid>
                <Grid container item xs={12} justify='space-between'>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            history.push('/login');
                        }}
                        variant='text'
                    >
                        Login
                    </Button>
                    <Button type='submit' variant='contained' color='primary'>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

PasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
