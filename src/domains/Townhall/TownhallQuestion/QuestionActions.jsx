import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Bold from '../../../components/Bold/Bold';
import useJwt from '../../../hooks/useJwt';
import useSnack from '../../../hooks/useSnack';

export default function QuestionActions({ targetMsg, onClick, currentQuestion }) {
    const [jwt] = useJwt();
    const [snack] = useSnack();
    const { roomId } = useParams();
    const handleSetCurrent = () => {
        fetch(`/api/questions/set-asked/${roomId}`, {
            method: 'POST',
            body: JSON.stringify({ question: currentQuestion }),
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200) {
                console.log('the used question set to asked failed')
            }
        });
        fetch(`/api/sessions/set-question/${roomId}`, {
            method: 'POST',
            body: JSON.stringify({ question: targetMsg }),
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                snack('Successfully set the current question', 'success');
                onClick();
            } else {
                snack('Something went wrong, please try again', 'error');
            }
        });
    };
    return (
        <Grid container justify='center' spacing={3}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid container>
                        <Grid item xs='auto'>
                            <Bold>{`${targetMsg.username}:`}</Bold>
                        </Grid>
                        <Grid item xs='auto'>
                            <Typography color='textPrimary' variant='body1'>
                                {targetMsg.message}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color='secondary'
                    variant='contained'
                    fullWidth
                    onClick={handleSetCurrent}
                >
                    Set as Current Question
                </Button>
            </Grid>
        </Grid>
    );
}

QuestionActions.defaultProps = {
    onClick: () => {}
};

QuestionActions.propTypes = {
    targetMsg: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func,
    currentQuestion: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired,
};
