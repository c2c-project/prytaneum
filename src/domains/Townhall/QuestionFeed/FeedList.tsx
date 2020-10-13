/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, Typography, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from 'components/Dialog';
import { Question } from '../types';
import QuestionForm from '../QuestionForm';
import QuestionFeedItem, { QuestionProps } from '../QuestionFeedItem';
import QuestionReplyForm from '../QuestionReplyForm';
import QuestionLabels from '../QuestionLabels';
import QuestionActions from '../QuestionActions';
import { CurrentQuestion } from './components';

type UserActionTypes = 'Like' | 'Quote' | 'Reply';
type ModActionTypes = 'Set Current' | 'Remove From Queue' | 'Queue Question';

const modActions: ModActionTypes[] = [
    'Queue Question',
    'Remove From Queue',
    'Set Current',
];

const userActions: UserActionTypes[] = ['Like', 'Quote', 'Reply'];

interface Props {
    questions: Question[];
    variant: 'moderator' | 'user';
    current: Question | undefined;
    systemMessages: QuestionProps[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    item: {
        paddingBottom: theme.spacing(2),
    },
}));

function QuestionFeed({ questions, variant, current, systemMessages }: Props) {
    const classes = useStyles();
    const [
        dialogContent,
        setDialogContent,
    ] = React.useState<JSX.Element | null>(null);

    function closeDialog() {
        setDialogContent(null);
    }

    function handleUserAction(questionId: string, actionType: UserActionTypes) {
        const target = questions.find(({ _id }) => _id === questionId);

        // this should never happen, but to keep ts happy I have to
        if (!target) return;

        switch (actionType) {
            case 'Like': {
                // TODO: socket stuff here
                console.log('liked');
                break;
            }
            case 'Quote': {
                // open dialog with the quoted question
                // TODO: onSubmit
                setDialogContent(
                    <QuestionForm
                        quote={target}
                        onCancel={closeDialog}
                        onSubmit={console.log}
                    />
                );
                break;
            }
            case 'Reply': {
                // open dialog with the replied quote
                // TODO: onSubmit
                setDialogContent(
                    <QuestionReplyForm
                        replyTo={target}
                        onSubmit={console.log}
                        onCancel={closeDialog}
                    />
                );
                break;
            }
            default: {
                // do nothing
                break;
            }
        }
    }
    function handleModAction(questionId: string, actionType: ModActionTypes) {
        const target = questions.find(({ _id }) => _id === questionId);

        // this should never happen, but to keep ts happy I have to
        if (!target) return;

        switch (actionType) {
            case 'Queue Question': {
                // TODO: queue question
                break;
            }
            case 'Remove From Queue': {
                // TODO: remove question from queue
                break;
            }
            case 'Set Current': {
                // TODO: set as current question
                break;
            }
            default: {
                // do nothing
                break;
            }
        }
    }

    function getActions({ _id }: Question) {
        if (variant === 'moderator')
            return (
                <QuestionActions
                    actionKeys={modActions}
                    onClick={(_e, key) => handleModAction(_id, key)}
                />
            );
        return (
            <QuestionActions
                actionKeys={userActions}
                onClick={(_e, key) => handleUserAction(_id, key)}
            />
        );
    }

    return (
        <div className={classes.root}>
            <Dialog open={Boolean(dialogContent)} onClose={closeDialog}>
                <DialogContent>{dialogContent || <div />}</DialogContent>
            </Dialog>
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    {questions.length === 0 &&
                        systemMessages.map((props) => (
                            <QuestionFeedItem
                                {...props}
                                className={classes.item}
                            />
                        ))}
                    {current && (
                        <CurrentQuestion className={classes.item}>
                            <QuestionFeedItem
                                user={current.meta.user.name}
                                timestamp={current.meta.timestamp}
                                actions={
                                    variant === 'moderator' &&
                                    getActions(current)
                                }
                            >
                                <Typography>{current.question}</Typography>
                                {variant === 'moderator' && (
                                    <QuestionLabels
                                        labels={current.aiml.labels}
                                    />
                                )}
                            </QuestionFeedItem>
                        </CurrentQuestion>
                    )}
                    {questions.map((question) => {
                        const { question: text, meta, aiml } = question;
                        return (
                            <QuestionFeedItem
                                user={meta.user.name}
                                timestamp={meta.timestamp}
                                actions={getActions(question)}
                                className={classes.item}
                            >
                                <Typography paragraph>{text}</Typography>
                                {variant === 'moderator' && (
                                    <QuestionLabels labels={aiml.labels} />
                                )}
                            </QuestionFeedItem>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
}

export default React.memo(QuestionFeed);
