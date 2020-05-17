import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useJwt from '../../../hooks/useJwt';
import useSnack from '../../../hooks/useSnack';

/**
 * @description Form to submit a new question to the question queue
 * @arg {Object} props
 * @arg {Function} props.onSubmit function to run after form is submitted
 * @arg {String} props.roomId the id of the room, which is the same as the sessions' right now
 */
export default function FormQuestion({ onSubmit, roomId }) {
    const [question, setQuestion] = React.useState('');
    const [jwt] = useJwt();
    const [snack] = useSnack();
    const handleSubmit = e => {
        e.preventDefault();
        fetch('/api/questions/submit-question', {
            method: 'POST',
            body: JSON.stringify({ form: { question }, sessionId: roomId }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${jwt}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    snack('Successfully sent the question!', 'success');
                    onSubmit();
                } else {
                    snack('Something went wrong! Try again.', 'error');
                }
            })
            .catch(err => {
                console.log(err);
                snack('Oh no something went wrong, please try again', 'error');
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        label='Your Question Here'
                        fullWidth
                        variant='outlined'
                    />
                </Grid>
                <Grid container item xs={12} justify='flex-end'>
                    <Button type='submit' variant='contained'>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

FormQuestion.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired
};
