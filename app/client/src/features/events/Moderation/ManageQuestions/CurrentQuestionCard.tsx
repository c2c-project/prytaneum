import * as React from 'react';
import { Grid, Chip, Typography, Stack, Tooltip, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import type { useOnDeckFragment$key } from '@local/__generated__/useOnDeckFragment.graphql';
import { QuestionAuthor, QuestionContent, QuestionQuote, QuestionTopics } from '@local/components/ui/Question';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';
import { useOnDeck } from '../../ModeratorView/hooks/OnDeck/useOnDeck';

interface QuestionQueueProps {
    isViewerModerator: boolean;
    fragmentRef: useOnDeckFragment$key;
}

export function CurrentQuestionCard({ isViewerModerator, fragmentRef }: QuestionQueueProps) {
    const theme = useTheme();
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const { enqueuedQuestions, questionRecord, recordConnection, queueConnection } = useOnDeck({ fragmentRef });

    //
    // ─── SUBSCRIPTION HOOKS ─────────────────────────────────────────────────────────
    //
    useRecordPush({ connection: recordConnection });
    useRecordRemove({ connection: recordConnection });
    useRecordUnshift({ connection: recordConnection });

    useEnqueuedPush({ connection: queueConnection });
    useEnqueuedRemove({ connection: queueConnection });
    useEnqueuedUnshift({ connection: queueConnection });

    const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
    const canGoForward = React.useMemo(() => enqueuedQuestions.length > 0, [enqueuedQuestions]);
    const currentQuestion = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord[questionRecord.length - 1] : null),
        [questionRecord]
    );

    return (
        <React.Fragment>
            {isViewerModerator && (
                <Stack
                    direction='row'
                    width='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    style={{ padding: theme.spacing(0, 1, 0, 1) }}
                >
                    <PreviousQuestionButton disabled={!canGoBackward} />
                    <Tooltip title='Answering Now' placement='top'>
                        <Chip
                            color='secondary'
                            icon={<BookmarkIcon fontSize='small' />}
                            label='Answering Now'
                            style={{
                                padding: theme.spacing(0.5),
                                width: '50%',
                                backgroundColor: theme.palette.custom.creamCan,
                                background: theme.palette.custom.creamCan,
                                color: 'white',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                        />
                    </Tooltip>
                    <NextQuestionButton disabled={!canGoForward} />
                </Stack>
            )}
            <Card
                sx={{
                    minHeight: '190px',
                    maxHeight: '300px',
                    width: '100%',
                    overflowY: 'scroll',
                }}
            >
                {!currentQuestion && (
                    <Grid container alignItems='center'>
                        <Typography style={{ margin: 'auto', paddingTop: '20px' }}>No Current Question</Typography>
                    </Grid>
                )}
                {currentQuestion && <QuestionAuthor fragmentRef={currentQuestion} />}
                {currentQuestion && currentQuestion.refQuestion && (
                    <QuestionQuote fragmentRef={currentQuestion.refQuestion} />
                )}
                {currentQuestion && <QuestionContent fragmentRef={currentQuestion} />}
                {isViewerModerator && currentQuestion && <QuestionTopics fragmentRef={currentQuestion} />}
            </Card>
        </React.Fragment>
    );
}
