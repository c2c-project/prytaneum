import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Chip, Card, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';
import { QuestionAuthor, QuestionContent, QuestionQuote } from '../../Questions';
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
        marginTop: theme.spacing(3),
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
        fontWeight: 600,
    },
    currentQuestionActions: {
        padding: theme.spacing(0, 1, 1, 1),
    },
    text: {
        margin: 'auto',
        paddingTop: '20px',
    },
    typographyContainer: {
        alignItems: 'center',
    },
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
                ?.sort(({ node: a }, { node: b }) => (parseInt(a?.position) ?? 0) - (parseInt(b?.position) ?? 0)) ?? [],
        [questionQueue]
    );
    const questionRecord = React.useMemo(
        () =>
            questionQueue?.questionRecord?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (parseInt(a?.position) ?? 0) - (parseInt(b?.position) ?? 0)) ?? [],
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
            <Card className={`${classes.item} ${classes.relative}`}>
                <Chip
                    color='secondary'
                    icon={<BookmarkIcon fontSize='small' />}
                    label='Answering Now'
                    className={classes.answeringNow}
                />
                {currentQuestion && <QuestionAuthor fragmentRef={currentQuestion.node} />}
                {currentQuestion && currentQuestion.node.refQuestion && (
                    <QuestionQuote fragmentRef={currentQuestion.node.refQuestion} />
                )}
                {currentQuestion && <QuestionContent fragmentRef={currentQuestion.node} />}
                <Grid container alignItems='center' className={classes.typographyContainer}>
                    {!currentQuestion && <Typography className={classes.text}>No Current Question</Typography>}
                </Grid>
                {isViewerModerator && (
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='space-between'
                        className={classes.currentQuestionActions}
                    >
                        <PreviousQuestionButton disabled={!canGoBackward} />
                        <NextQuestionButton disabled={!canGoForward} />
                    </Grid>
                )}
            </Card>
        </>
    );
}
