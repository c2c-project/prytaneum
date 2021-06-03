import * as React from 'react';
import { Grid, DialogContent, CardActions, Card, CardContent, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { EventQuestion as Question } from '@local/graphql-types';
import type { useQuestionListFragment$data } from '@local/__generated__/useQuestionListFragment.graphql';
import { ResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser, useEvent } from '@local/hooks';
// import QuestionLabels from '../QuestionLabels';
import { ArrayElement } from '@local/utils/ts-utils';
import { Like, QueueButton, Quote /* Reply */ } from '../QuestionActions';
import QuestionCard from '../QuestionCard';

interface Props {
    variant: 'moderator' | 'user';
    systemMessages: React.ReactNodeArray;
    className?: string;
    eventId: string;
    questions: ArrayElement<NonNullable<NonNullable<useQuestionListFragment$data['questions']>['edges']>>['node'][];
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

function FeedList({ variant, systemMessages, className, eventId, questions }: Props) {
    const [user] = useUser();
    // const [{ id: eventId }] = useEvent();
    const isModerator = React.useMemo(() => variant === 'moderator', [variant]);
    const classes = useStyles();
    const [dialogContent, setDialogContent] = React.useState<JSX.Element | null>(null);
    // TODO: make this a subscription on the backend for "live data" rather than a local state here
    const [liked, setLiked] = React.useState<Set<string>>(new Set());
    const isDialogOpen = React.useMemo(() => Boolean(dialogContent), [dialogContent]);
    const { queue } = useSelector((store) => store.queue);

    const isQueued = React.useCallback(
        (questionId: string) => Boolean(queue.find(({ _id }) => _id === questionId)),
        [queue]
    );

    function closeDialog() {
        setDialogContent(null);
    }

    const questionList = (
        <List disablePadding>
            {questions.map((question) => (
                <ListItem disableGutters key={question.id}>
                    <QuestionCard
                        stats={isModerator}
                        fragmentRef={question}
                        className={classes.item}
                        // quote={refQuestion}
                    >
                        {/* {isModerator && <QuestionLabels labels={question.aiml.labels} />} */}
                        <CardActions className={classes.questionActions}>
                            {!isModerator && (
                                <Like
                                    id={eventId}
                                    questionId={question.id}
                                    // liked={
                                    //     (user && question.likes.includes(user._id)) || liked.has(question._id)
                                    // }
                                    // onLike={() =>
                                    //     setLiked((prev) => {
                                    //         const nextState = new Set(prev).add(question._id);
                                    //         return nextState;
                                    //     })
                                    // }
                                    // onDeleteLike={() =>
                                    //     setLiked((prev) => {
                                    //         const copy = new Set(prev);
                                    //         copy.delete(questionId);
                                    //         return copy;
                                    //     })
                                    // }
                                />
                            )}
                            {/* {!isModerator && <Quote question={question} />} */}
                            {isModerator && <QueueButton isQueued={isQueued(question.id)} questionId={question.id} />}
                            {/* <Reply question={question} /> */}
                        </CardActions>
                    </QuestionCard>
                </ListItem>
            ))}
        </List>
    );

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
