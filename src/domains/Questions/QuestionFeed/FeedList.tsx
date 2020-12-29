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
import QuestionLabels from '../QuestionLabels';
import { Like, Quote /* Reply */ } from '../QuestionActions';
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
    const classes = useStyles();
    const [
        dialogContent,
        setDialogContent,
    ] = React.useState<JSX.Element | null>(null);
    const isDialogOpen = React.useMemo(() => Boolean(dialogContent), [
        dialogContent,
    ]);

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
                    <CardActions className={classes.questionActions}>
                        <Like townhallId={townhallId} questionId={questionId} />
                        <Quote question={question} />
                        {/* <Reply question={question} /> */}
                    </CardActions>
                    {variant === 'moderator' && (
                        <QuestionLabels labels={question.aiml.labels} />
                    )}
                </QuestionCard>
            );
        });
    }, [questions, classes.item, classes.questionActions, variant]);

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
