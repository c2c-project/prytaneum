/* eslint-disable no-console */ // FIXME:
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Grid,
    DialogContent,
    CardActions,
    Card,
    CardContent,
    // IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Question } from 'prytaneum-typings';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import Dialog from 'components/Dialog';
import useUser from 'hooks/useUser';
import useTownhall from 'hooks/useTownhall';
import QuestionLabels from '../QuestionLabels';
import { Like, Suggest, Quote /* Reply */ } from '../QuestionActions';
import { CurrentQuestion } from './components';
import QuestionCard from '../QuestionCard';

interface Props {
    questions: Question[];
    variant: 'moderator' | 'user';
    current: Question | undefined;
    systemMessages: React.ReactNodeArray;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        marginBottom: theme.spacing(2),
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    questionActions: {
        padding: 0,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    card: {},
}));

function FeedList({
    questions,
    variant,
    current,
    systemMessages,
    className,
}: Props) {
    const [user] = useUser();
    const [townhall, isModerator] = useTownhall();
    const classes = useStyles();
    const [
        dialogContent,
        setDialogContent,
    ] = React.useState<JSX.Element | null>(null);
    // TODO: make this a subscription on the backend for "live data" rather than a local state here
    const [liked, setLiked] = React.useState<Set<string>>(new Set());
    const isDialogOpen = React.useMemo(() => Boolean(dialogContent), [
        dialogContent,
    ]);

    const isSuggested = React.useCallback(
        (questionId: string) =>
            Boolean(
                townhall.state.playlist.list.find(
                    ({ _id }) => _id === questionId
                )
            ),
        [townhall]
    );

    function closeDialog() {
        setDialogContent(null);
    }

    const questionList = React.useMemo(() => {
        return questions.map((question) => {
            const { townhallId } = question.meta;
            const questionId = question._id;
            return (
                <QuestionCard
                    key={questionId}
                    question={question}
                    className={classes.item}
                    // CardHeaderProps={{
                    //     action: (
                    //         <IconButton>
                    //             <MoreVertIcon />
                    //         </IconButton>
                    //     ),
                    // }}
                    quote={question.quote}
                >
                    {variant === 'moderator' && (
                        <QuestionLabels labels={question.aiml.labels} />
                    )}
                    <CardActions className={classes.questionActions}>
                        {!isModerator && (
                            <Like
                                townhallId={townhallId}
                                questionId={questionId}
                                liked={
                                    (user &&
                                        question.likes.includes(user._id)) ||
                                    liked.has(question._id)
                                }
                                onLike={() =>
                                    setLiked((prev) => {
                                        const nextState = new Set(prev).add(
                                            question._id
                                        );
                                        console.log(nextState);
                                        return nextState;
                                    })
                                }
                                onDeleteLike={() =>
                                    setLiked((prev) => {
                                        const copy = new Set(prev);
                                        copy.delete(question._id);
                                        console.log(copy);
                                        return copy;
                                    })
                                }
                            />
                        )}
                        {!isModerator && <Quote question={question} />}
                        {isModerator && (
                            <Suggest
                                questionId={question._id}
                                townhallId={townhallId}
                                suggested={isSuggested(question._id)}
                            />
                        )}
                        {/* <Reply question={question} /> */}
                    </CardActions>
                </QuestionCard>
            );
        });
    }, [
        questions,
        classes.item,
        classes.questionActions,
        variant,
        liked,
        user,
        setLiked,
        isModerator,
        isSuggested,
    ]);

    return (
        <div className={className}>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogContent>{dialogContent || <div />}</DialogContent>
            </Dialog>
            <Grid container>
                {questions.length === 0 && (
                    <Grid item xs={12}>
                        {systemMessages.map((node, idx) => (
                            <Card key={idx} className={classes.item}>
                                <CardContent>{node}</CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}
                {current && (
                    <CurrentQuestion>
                        <QuestionCard
                            question={current}
                            className={classes.item}
                        >
                            {variant === 'moderator' && (
                                <QuestionLabels labels={current.aiml.labels} />
                            )}
                        </QuestionCard>
                    </CurrentQuestion>
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
