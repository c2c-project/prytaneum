import React from 'react';
import { Grid, DialogContent, CardActions, Card, CardContent, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Question } from 'prytaneum-typings';
import { useSelector } from 'react-redux';

import ResponsiveDialog from 'components/ResponsiveDialog';
import useUser from 'hooks/useUser';
import QuestionLabels from '../QuestionLabels';
import { Like, QueueButton, Quote /* Reply */ } from '../QuestionActions';
import QuestionCard from '../QuestionCard';

interface Props {
    questions: Question[];
    variant: 'moderator' | 'user';
    systemMessages: React.ReactNodeArray;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    questionActions: {
        padding: 0,
        color: theme.palette.primary.light,
    },
    card: {},
    list: {
        width: '100%',
    },
}));

function FeedList({ questions, variant, systemMessages, className }: Props) {
    const [user] = useUser();
    const isModerator = React.useMemo(() => variant === 'moderator', [variant]);
    const classes = useStyles();
    const [dialogContent, setDialogContent] = React.useState<JSX.Element | null>(null);
    // TODO: make this a subscription on the backend for "live data" rather than a local state here
    const [liked, setLiked] = React.useState<Set<string>>(new Set());
    const isDialogOpen = React.useMemo(() => Boolean(dialogContent), [dialogContent]);
    const { queue } = useSelector((store) => store.queue);

    const isQueued = React.useCallback((questionId: string) => Boolean(queue.find(({ _id }) => _id === questionId)), [
        queue,
    ]);

    function closeDialog() {
        setDialogContent(null);
    }

    const questionList = React.useMemo(() => {
        return (
            <List disablePadding>
                {questions.map((question) => {
                    const { townhallId } = question.meta;
                    const questionId = question._id;
                    return (
                        <ListItem disableGutters key={questionId}>
                            <QuestionCard
                                stats={isModerator}
                                question={question}
                                className={classes.item}
                                quote={question.quote}
                            >
                                {isModerator && <QuestionLabels labels={question.aiml.labels} />}
                                <CardActions className={classes.questionActions}>
                                    {!isModerator && (
                                        <Like
                                            townhallId={townhallId}
                                            questionId={questionId}
                                            liked={
                                                (user && question.likes.includes(user._id)) || liked.has(question._id)
                                            }
                                            onLike={() =>
                                                setLiked((prev) => {
                                                    const nextState = new Set(prev).add(question._id);
                                                    return nextState;
                                                })
                                            }
                                            onDeleteLike={() =>
                                                setLiked((prev) => {
                                                    const copy = new Set(prev);
                                                    copy.delete(question._id);
                                                    return copy;
                                                })
                                            }
                                        />
                                    )}
                                    {!isModerator && <Quote question={question} />}
                                    {isModerator && (
                                        <QueueButton
                                            isQueued={isQueued(questionId)}
                                            townhallId={townhallId}
                                            questionId={questionId}
                                        />
                                    )}
                                    {/* <Reply question={question} /> */}
                                </CardActions>
                            </QuestionCard>
                        </ListItem>
                    );
                })}
            </List>
        );
    }, [questions, classes.item, classes.questionActions, liked, user, setLiked, isModerator, isQueued]);

    return (
        <div className={className}>
            <ResponsiveDialog open={isDialogOpen} onClose={closeDialog}>
                <DialogContent>{dialogContent || <div />}</DialogContent>
            </ResponsiveDialog>
            <Grid container>
                {questions.length === 0 && (
                    <List className={classes.list}>
                        {systemMessages.map((node, idx) => (
                            <ListItem disableGutters key={idx}>
                                <Card className={classes.item}>
                                    <CardContent>{node}</CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Grid item xs={12}>
                    {questionList}
                </Grid>
            </Grid>
        </div>
    );
}

FeedList.defaultProps = {
    className: undefined,
};

export default React.memo(FeedList);
