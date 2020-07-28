import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Bold from '../../Bold/Bold';
import Dialog from '../../Dialog';
import QuestionActions from '../question/QuestionActions';
import MessageActions from '../chat/MessageActions';
import useJwt from '../../../hooks/useJwt';

const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        // overflowY: 'scroll'
    },
    message: {
        width: '100%',
    },
    maxHeight: {
        height: '100%',
    },
    tipWidth: {
        maxWidth: 100,
    },
    buttonWidth: {
        maxWidth: 10,
    },
});

function Question({
    messages,
    variant,
    currentQuestion,
    showsUserName,
    sortBy,
}) {
    const classes = useStyles();
    const lastMessageRef = React.useRef(null);
    const [jwt] = useJwt();
    const [isModerator, setModerator] = React.useState(false);
    const [targetMsg, setTargetMsg] = React.useState(null);

    const Actions = variant === 'questions' ? QuestionActions : MessageActions;

    const scrollToBottom = () => {
        lastMessageRef.current.scrollIntoView({
            behavior: 'smooth',
        });
    };

    const isCurrent = (_id) => {
        return currentQuestion._id === _id;
    };

    const questionListContainsAsked = (sub, center) => {
        if (currentQuestion._id === center._id) {
            return true;
        }
        return sub.find((q) => {
            return currentQuestion._id === q._id;
        });
    };

    const setCurrentAction = (event, _id, message, username) => {
        event.stopPropagation();
        if (isModerator) {
            if (
                (currentQuestion && currentQuestion._id !== _id) ||
                !currentQuestion
            ) {
                console.log('click set current action');
                setTargetMsg({
                    _id,
                    message,
                    username,
                });
            }
        }
    };

    const generateTimeElapsed = (date) => {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime);
        let relative = '';
        const elapsed = timestamp - Math.floor(new Date(date));
        if (elapsed < msPerMinute) {
            relative = `${Math.round(elapsed / 1000)} seconds ago`;
        } else if (elapsed < msPerHour) {
            relative = `${Math.round(elapsed / msPerMinute)} minutes ago`;
        } else if (elapsed < msPerDay) {
            relative = `${Math.round(elapsed / msPerHour)} hours ago`;
        } else if (elapsed < msPerMonth) {
            relative = `approximately ${Math.round(
                elapsed / msPerDay
            )} days ago`;
        } else if (elapsed < msPerYear) {
            relative = `approximately ${Math.round(
                elapsed / msPerMonth
            )} months ago`;
        } else {
            relative = `approximately ${Math.round(
                elapsed / msPerYear
            )} years ago`;
        }
        return relative;
    };

    const QToolTipContent = (question, time, _id, asked, toxicity) => {
        let q = '';
        if (asked === true) {
            q = `Asked ${q}`;
        }
        if (isCurrent(_id) === true) {
            q = `Current ${q}`;
        }
        if (toxicity === true) {
            q = `Toxic ${q}`;
        }
        if (q.length > 0) {
            return (
                <>
                    <p>{q}</p>
                    <p>{generateTimeElapsed(time)}</p>
                    <p>{question}</p>
                </>
            );
        }
        return (
            <>
                <p>{generateTimeElapsed(time)}</p>
                <p>{question}</p>
            </>
        );
    };

    const QuestionOrder = () => {
        switch (sortBy) {
            case 'time: low to high':
                return messages
                    .sort(function (a, b) {
                        if (a.date > b.date) return 1;
                        if (a.date < b.date) return -1;
                        return 1;
                    })
                    .reduce((messagelist, message) => {
                        messagelist.push([message]);
                        return messagelist;
                    }, []);
            case 'time: high to low':
                return messages
                    .sort(function (b, a) {
                        if (a.date > b.date) return 1;
                        if (a.date < b.date) return -1;
                        return 1;
                    })
                    .reduce((messagelist, message) => {
                        messagelist.push([message]);
                        return messagelist;
                    }, []);
            default:
                return messages
                    .sort(function (a, b) {
                        if (a.clusterNumber > b.clusterNumber) return 1;
                        if (a.clusterNumber < b.clusterNumber) return -1;
                        if (a.isCenter) return -1;
                        return 1;
                    })
                    .reduce((messagelist, message) => {
                        if (
                            message.isCenter === true ||
                            messagelist.length === 0
                        ) {
                            messagelist.push([message]);
                            return messagelist;
                        }
                        messagelist[messagelist.length - 1].push(message);
                        return messagelist;
                    }, []);
        }
    };

    React.useEffect(() => {
        let isMounted = true;
        fetch('/api/users/authenticate', {
            method: 'POST',
            body: JSON.stringify({ requiredAny: ['moderator', 'admin'] }),
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        }).then((r) => {
            r.json().then((result) => {
                if (isMounted) {
                    setModerator(result.allowed);
                }
            });
        });
        return () => {
            isMounted = false;
        };
    }, [jwt]);
    React.useEffect(scrollToBottom, [messages]);

    return (
        <div className={classes.root}>
            {QuestionOrder().map(([center, ...sub] = [], idx) => (
                <ExpansionPanel key={idx}>
                    <ExpansionPanelSummary
                        // disabled={isModerator}
                        key={center._id}
                        className={classes.message}
                        expandIcon={<ExpandMoreIcon />}
                        aria-label='Expand'
                        aria-controls='additional-actions1-content'
                        id='center.clusterNumber'
                    >
                        <Tooltip
                            title={
                                isCurrent(center._id)
                                    ? 'Is a Current'
                                    : 'Click to set as current question'
                            }
                            placement='top'
                            // arrow
                            TransitionComponent={Zoom}
                        >
                            <IconButton
                                onClick={(event) =>
                                    setCurrentAction(
                                        event,
                                        center._id,
                                        center.question,
                                        center.username
                                    )}
                                onFocus={(event) => event.stopPropagation()}
                                size='small'
                            >
                                <QuestionAnswerIcon
                                    fontSize='small'
                                    color={
                                        questionListContainsAsked(sub, center)
                                            ? 'secondary'
                                            : 'primary'
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        {showsUserName === true ? (
                            <Bold>{`${center.username}:`}</Bold>
                        ) : (
                            <div />
                        )}
                        <Typography
                            color='textSecondary'
                            variant='body1'
                            onClick={(event) =>
                                setCurrentAction(
                                    event,
                                    center._id,
                                    center.question,
                                    center.username
                                )}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            {center.toxicity === true ? ' (toxic) ' : ''}
                        </Typography>
                        <Tooltip
                            title={QToolTipContent(
                                center.question,
                                center.date,
                                center._id,
                                center.asked,
                                center.toxicity
                            )}
                            placement='top'
                            // arrow
                            TransitionComponent={Zoom}
                        >
                            <Typography
                                color={
                                    // eslint-disable-next-line no-nested-ternary
                                    currentQuestion._id === center._id
                                        ? 'error'
                                        : center.asked
                                            ? 'textSecondary'
                                            : 'textPrimary'
                                }
                                variant='body1'
                                onClick={(event) =>
                                    setCurrentAction(
                                        event,
                                        center._id,
                                        center.question,
                                        center.username
                                    )}
                                onFocus={(event) => event.stopPropagation()}
                            >
                                {center.question}
                            </Typography>
                        </Tooltip>
                    </ExpansionPanelSummary>
                    {sub.map(
                        ({
                            username,
                            message,
                            date,
                            _id,
                            toxicity,
                            asked,
                        } = {}) => (
                            <ExpansionPanelDetails>
                                <Tooltip
                                    title={
                                        isCurrent(_id)
                                            ? 'Is the Current'
                                            : 'Not the Current. Press me to set Current'
                                    }
                                    placement='top'
                                    arrow
                                    TransitionComponent={Zoom}
                                >
                                    <IconButton
                                        onClick={(event) =>
                                            setCurrentAction(
                                                event,
                                                center._id,
                                                center.question,
                                                center.username
                                            )}
                                        onFocus={(event) =>
                                            event.stopPropagation()}
                                        size='small'
                                    >
                                        <QuestionAnswerIcon
                                            fontSize='small'
                                            color={
                                                isCurrent(_id)
                                                    ? 'secondary'
                                                    : 'primary'
                                            }
                                        />
                                    </IconButton>
                                </Tooltip>
                                {showsUserName === true ? (
                                    <Bold>{`${center.username}:`}</Bold>
                                ) : (
                                    <div />
                                )}
                                <Typography
                                    color='textSecondary'
                                    variant='body1'
                                >
                                    {toxicity === true ? ' (toxic) ' : ''}
                                </Typography>
                                <Tooltip
                                    title={QToolTipContent(
                                        message,
                                        date,
                                        _id,
                                        asked,
                                        toxicity
                                    )}
                                    placement='top'
                                    arrow
                                    TransitionComponent={Zoom}
                                >
                                    <Typography
                                        color={
                                            // eslint-disable-next-line no-nested-ternary
                                            currentQuestion._id === _id
                                                ? 'error'
                                                : asked
                                                    ? 'textSecondary'
                                                    : 'textPrimary'
                                        }
                                        variant='body1'
                                        onClick={(event) =>
                                            setCurrentAction(
                                                event,
                                                _id,
                                                message,
                                                username
                                            )}
                                    >
                                        {message}
                                    </Typography>
                                </Tooltip>
                            </ExpansionPanelDetails>
                        )
                    )}
                </ExpansionPanel>
            ))}
            <div ref={lastMessageRef} />
            <Dialog
                open={Boolean(targetMsg)}
                onClose={() => setTargetMsg(null)}
            >
                <Container maxWidth='sm' className={classes.maxHeight}>
                    <Grid
                        container
                        className={classes.maxHeight}
                        alignContent='center'
                    >
                        {targetMsg && isModerator ? (
                            <Actions
                                targetMsg={targetMsg}
                                onClick={() => setTargetMsg(null)}
                                currentQuestion={currentQuestion}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}

Question.defaultProps = {
    messages: [],
};

Question.propTypes = {
    messages: PropTypes.array,
    variant: PropTypes.oneOf(['questions', 'messages']).isRequired,
    currentQuestion: PropTypes.oneOfType([
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        }),
        PropTypes.bool,
    ]).isRequired,
    showsUserName: PropTypes.bool.isRequired,
    sortBy: PropTypes.string.isRequired,
};

export default Question;
