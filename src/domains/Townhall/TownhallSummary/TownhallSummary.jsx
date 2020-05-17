import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useJwt from '../hooks/useJwt';
import PageContainer from '../layout/PageContainer';

const useStyles = makeStyles({
    card: {
        height: 140
    }
});

export default function SessionSummary() {
    const classes = useStyles();
    const history = useHistory();
    const [target, setTarget] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [tdata, tsetData] = React.useState([]);
    const [force, refetch] = React.useReducer(x => x + 1, 0);
    const [jwt] = useJwt();

    const goToSession = (sessionId, messages, duration, speaker) => {
        // TODO: change this when I change how I get the session data
        setTarget(sessionId);

        localStorage.setItem(
            'session',
            JSON.stringify(data.find(session => sessionId === session._id))
        );
        fetch(`/api/analytics/session-summary/${sessionId}`, {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        }).then(res => {
            
            res.json().then(r => console.log(r));
        });
        history.push({
            pathname: `/app/sessions/${sessionId}/session-summary`,
            state: {
                id: sessionId,
                sent: messages.sent,
                asked: messages.asked,
                unanswered: messages.unanswered,
                duration: duration,
                speaker: speaker,
                tdata:tdata
            }
        });
    };

    React.useEffect(() => {
        fetch('/api/sessions/session-summary', {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        }).then(res => {
            res.json().then(r => setData(r));
        });
    }, [force]);

    return (
        <PageContainer>
            {data.map(
                (
                    {
                        _id,
                        speaker,
                        moderator,
                        description,
                        messages,
                        duration
                    },
                    idx
                ) => (
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                title='Contemplative Reptile'
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='h2'
                                >
                                    {speaker}
                                    's Session
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    Details about this session
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Share
                            </Button>
                            <Button
                                size='small'
                                color='primary'
                                onClick={() =>
                                    goToSession(
                                        _id,
                                        messages,
                                        duration,
                                        speaker
                                    )
                                }
                            >
                                View Summary
                            </Button>
                            <Button
                                size='small'
                                color='primary'
                                onClick={() => {
                                    history.push({
                                        pathname: `/app/sessions/${_id}/clips`,
                                        state: {
                                            id: _id
                                        }
                                    });
                                }}
                            >
                                Clips
                            </Button>
                        </CardActions>
                    </Card>
                )
            )}
        </PageContainer>
    );
}
