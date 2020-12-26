/* eslint-disable no-console */ // FIXME:
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Grid,
    DialogContent,
    CardActions,
    Card,
    CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { Question } from 'prytaneum-typings';

import Dialog from 'components/Dialog';
import QuestionLabels from '../QuestionLabels';
import { Like, Quote, Reply } from '../QuestionActions';
import { CurrentQuestion } from './components';
import QuestionCard from '../QuestionCard';

interface Props {
    questions: Question[];
    variant: 'moderator' | 'user';
    current: Question | undefined;
    systemMessages: React.ReactNodeArray;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxHeight: 'inherit',
    },
    item: {
        marginBottom: theme.spacing(2),
        flex: '1 1 100%',
    },
    questionActions: {
        padding: 0,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
}));

function FeedList({ questions, variant, current, systemMessages }: Props) {
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
                    CardProps={{ className: classes.item }}
                >
                    <CardActions className={classes.questionActions}>
                        <Like townhallId={townhallId} questionId={questionId} />
                        <Quote question={question} />
                        <Reply question={question} />
                    </CardActions>
                    {variant === 'moderator' && (
                        <QuestionLabels labels={question.aiml.labels} />
                    )}
                </QuestionCard>
            );
        });
    }, [questions]);

    return (
        <div className={classes.root}>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogContent>{dialogContent || <div />}</DialogContent>
            </Dialog>
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    {questions.length === 0 &&
                        systemMessages.map((node, idx) => (
                            <Card key={idx} className={classes.item}>
                                <CardContent>{node}</CardContent>
                            </Card>
                        ))}
                    {current && (
                        <CurrentQuestion>
                            <QuestionCard
                                question={current}
                                className={classes.item}
                            >
                                {variant === 'moderator' && (
                                    <QuestionLabels
                                        labels={current.aiml.labels}
                                    />
                                )}
                            </QuestionCard>
                        </CurrentQuestion>
                    )}
                    <Grid item xs={12} style={{ maxHeight: '100%' }}>
                        {questionList}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(FeedList);
