import { useMemo, useReducer, useEffect } from 'react';
import { Card, Paper, Button, IconButton, Grid, CardContent, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { graphql, useFragment } from 'react-relay';

import type { QuestionCarouselFragment$key } from '@local/__generated__/QuestionCarouselFragment.graphql';
import { QuestionAuthor, QuestionContent, QuestionQuote } from '@local/components/ui/Question';
import { useRecordPush } from '@local/features/events/Moderation/ManageQuestions/useRecordPush';
import { useRecordRemove } from '@local/features/events/Moderation/ManageQuestions/useRecordRemove';

const QUESTION_CAROUSEL_FRAGMENT = graphql`
    fragment QuestionCarouselFragment on Event
    @argumentDefinitions(
        first: { type: Int, defaultValue: 1000 }
        after: { type: String, defaultValue: "" }
        userLang: { type: "String!" }
    ) {
        id
        currentQuestion
        questionQueue {
            questionRecord(first: $first, after: $after) @connection(key: "QuestionCarousel_questionRecord") {
                __id
                edges {
                    cursor
                    node {
                        position
                        ...QuestionAuthorFragment
                        ...QuestionContentFragment @arguments(lang: $userLang)
                        refQuestion {
                            ...QuestionQuoteFragment @arguments(lang: $userLang)
                        }
                    }
                }
            }
        }
    }
`;

export interface QuestionCarouselProps {
    fragmentRef: QuestionCarouselFragment$key;
}

type TState = {
    idx: number;
    currQuestionIdx: number;
};
type TActions =
    | { type: 'next'; payload?: never }
    | { type: 'previous'; payload?: never }
    | { type: 'updateCurrentQuestionIdx'; payload: number }
    | { type: 'goToCurrent'; payload?: never };

function reducer(state: TState, action: TActions): TState {
    switch (action.type) {
        case 'next':
            return { ...state, idx: state.idx + 1 };
        case 'previous':
            return { ...state, idx: state.idx - 1 };
        case 'updateCurrentQuestionIdx':
            return {
                ...state,
                currQuestionIdx: action.payload,
                idx: state.idx === state.currQuestionIdx ? action.payload : state.idx,
            };
        case 'goToCurrent':
            return {
                ...state,
                idx: state.currQuestionIdx,
            };
        default:
            return state;
    }
}

export function QuestionCarousel({ fragmentRef }: QuestionCarouselProps) {
    const data = useFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const [state, dispatch] = useReducer<typeof reducer>(reducer, { idx: -1, currQuestionIdx: -1 });
    const recordConnection = useMemo(
        () => ({ connection: data.questionQueue?.questionRecord?.__id ?? '' }),
        [data.questionQueue?.questionRecord]
    );

    useRecordPush(recordConnection);
    useRecordRemove(recordConnection);

    // somewhat redundant, but ensures that everything is sorted
    const sortedQuestions = useMemo(
        () =>
            data.questionQueue?.questionRecord?.edges
                ?.slice(0)
                .sort((edgeA, edgeB) =>
                    edgeA.node.position && edgeB.node.position
                        ? parseInt(edgeA.node.position) - parseInt(edgeB.node.position)
                        : 0
                ) ?? [],
        [data]
    );

    const currQuestionIdx = useMemo(() => sortedQuestions.length - 1, [sortedQuestions]);

    useEffect(() => {
        if (state.currQuestionIdx !== currQuestionIdx)
            dispatch({ type: 'updateCurrentQuestionIdx', payload: currQuestionIdx });
    }, [currQuestionIdx, state.currQuestionIdx]);

    // probably a better way to do this, but whatever
    const displayedQuestion = useMemo(
        () => (state.idx >= 0 && state.idx < sortedQuestions.length ? sortedQuestions[state.idx] : null),
        [sortedQuestions, state.idx]
    );

    return (
        <Paper sx={{ backgroundColor: (theme) => theme.palette.primary.light }}>
            <Grid container justifyContent='space-between'>
                <IconButton
                    disabled={state.idx === 0 || state.idx === -1}
                    style={{ color: 'white' }}
                    onClick={() => dispatch({ type: 'previous' })}
                    size='large'
                >
                    <ChevronLeft />
                </IconButton>
                <Button onClick={() => dispatch({ type: 'goToCurrent' })} style={{ color: 'white' }}>
                    {state.idx === state.currQuestionIdx ? 'Upcoming Question' : 'Go To Current'}
                </Button>
                <IconButton
                    disabled={state.currQuestionIdx === state.idx || state.idx === -1}
                    style={{ color: 'white' }}
                    onClick={() => dispatch({ type: 'next' })}
                    size='large'
                >
                    <ChevronRight />
                </IconButton>
            </Grid>
            <Grid
                component={Card}
                elevation={0}
                style={{ minHeight: 150 }}
                container
                alignItems='center'
                justifyContent='center'
            >
                {displayedQuestion ? (
                    <Grid item xs={12}>
                        <QuestionAuthor fragmentRef={displayedQuestion.node} />
                        {displayedQuestion.node.refQuestion && (
                            <QuestionQuote fragmentRef={displayedQuestion.node.refQuestion} />
                        )}
                        <QuestionContent fragmentRef={displayedQuestion.node} />
                    </Grid>
                ) : (
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' align='center'>
                            No question to display yet...
                        </Typography>
                    </CardContent>
                )}
            </Grid>
        </Paper>
    );
}
