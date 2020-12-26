import React from 'react';
import type { Question } from 'prytaneum-typings';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Paper,
    CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { formatDistanceToNow } from 'utils/format';
import QuestionCard from '../QuestionCard';
// import QuestionActions from '../QuestionActions';

interface Props {
    question: Question;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    card: {
        // borderRadius: 0,
        boxShadow: '0 10px 10px -10px rgba(0,0,0,0.3)',
    },
    replyContainer: {
        overflowY: 'scroll',
        flex: 1,
    },
    replies: {
        marginLeft: theme.spacing(4),
    },
    emptyMessage: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
}));
// TODO: use listfilter for the replies
export default function QuestionThread({ question }: Props) {
    const classes = useStyles();
    const replyContent = React.useMemo(() => {
        if (question.replies.length === 0) {
            return (
                <Typography
                    variant='body2'
                    align='center'
                    className={classes.emptyMessage}
                >
                    No replies to display
                </Typography>
            );
        }
        return (
            <List className={classes.replies}>
                {question.replies.map(({ _id, reply, meta }) => (
                    <ListItem key={_id}>
                        <ListItemAvatar>
                            <Avatar>{meta.createdBy.name.first[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    <Typography
                                        variant='body2'
                                        display='inline'
                                    >
                                        {meta.createdBy.name.first}
                                    </Typography>
                                    &nbsp;
                                    <Typography
                                        variant='caption'
                                        display='inline'
                                        color='textSecondary'
                                    >
                                        {formatDistanceToNow(meta.createdAt)}
                                    </Typography>
                                </>
                            }
                            secondary={reply}
                            secondaryTypographyProps={{
                                color: 'textPrimary',
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        );
    }, [question.replies, classes.replies, classes.emptyMessage]);

    return (
        <Paper elevation={0} className={classes.root}>
            <QuestionCard
                question={question}
                CardProps={{ className: classes.card, elevation: 6 }}
            >
                <CardActions>
                    {/* <QuestionActions
                        actionKeys={['Like', 'Quote', 'Reply']}
                        onClick={console.log}
                    /> */}
                </CardActions>
            </QuestionCard>
            <div className={classes.replyContainer}>{replyContent}</div>
        </Paper>
    );
}
