import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Chip, Card } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';
import { QuestionAuthor, QuestionContent } from '../../Questions';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';
import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';

const useStyles = makeStyles((theme) => ({
    item: {
        width: '100%',
        paddingTop: theme.spacing(0.5),
        borderRadius: '10px',
    },
    relative: {
        position: 'relative',
        overflow: 'visible',
        marginTop: theme.spacing(3)
    },
    answeringNow: {
        padding: theme.spacing(0.5),
        position: 'absolute',
        top: theme.spacing(-2),
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: theme.palette.custom.creamCan,
        background: theme.palette.background.default,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 600
    },
    currentQuestionActions: {
        padding: theme.spacing(0, 1, 1, 1)
    }
}));

interface QuestionQueueProps {
    isViewerModerator: boolean;
    fragmentRef: useQuestionQueueFragment$key;
}

export function CurrentQuestionCard({ isViewerModerator, fragmentRef }: QuestionQueueProps) {
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const { questionQueue } = useQuestionQueue({ fragmentRef });
    const recordConnection = React.useMemo(
        () => ({ connection: questionQueue?.questionRecord?.__id ?? '' }),
        [questionQueue?.questionRecord]
    );
    const enqueuedConnection = React.useMemo(
        () => ({ connection: questionQueue?.enqueuedQuestions?.__id ?? '' }),
        [questionQueue?.enqueuedQuestions]
    );

    const classes = useStyles();

    //
    // ─── SUBSCRIPTION HOOKS ─────────────────────────────────────────────────────────
    //
    useRecordPush(recordConnection);
    useRecordRemove(recordConnection);
    useRecordUnshift(recordConnection);
    useEnqueuedPush(enqueuedConnection);
    useEnqueuedRemove(enqueuedConnection);
    useEnqueuedUnshift(enqueuedConnection);

    //
    // ─── COMPUTED VALUES ────────────────────────────────────────────────────────────
    //
    const enqueuedQuestions = React.useMemo(
        () =>
            questionQueue?.enqueuedQuestions?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (a?.position ?? 0) - (b?.position ?? 0)) ?? [],
        [questionQueue]
    );
    const questionRecord = React.useMemo(
        () =>
            questionQueue?.questionRecord?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (a?.position ?? 0) - (b?.position ?? 0)) ?? [],
        [questionQueue]
    );
    const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
    const canGoForward = React.useMemo(() => enqueuedQuestions.length > 0, [enqueuedQuestions]);
    const currentQuestion = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord[questionRecord.length - 1] : null),
        [questionRecord]
    );

    return (
        <>
            { currentQuestion &&
                <Card className={`${classes.item} ${classes.relative}`}>
                    <Chip
                        color='secondary'
                        icon={<BookmarkIcon fontSize='small' />}
                        label='Answering Now'
                        className={classes.answeringNow}
                    />
                    <QuestionAuthor fragmentRef={currentQuestion.node} />
                    <QuestionContent fragmentRef={currentQuestion.node} />
                    { isViewerModerator &&
                        <Grid container alignItems='center' justify='space-between' className={classes.currentQuestionActions}>
                            <PreviousQuestionButton disabled={!canGoBackward} />
                            <NextQuestionButton disabled={!canGoForward} />
                        </Grid>
                    }
                </Card>
            }
        </>
    );
}
