import { useMemo, useReducer, useEffect } from 'react';
import { Card, Paper, Button, IconButton, Grid, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { graphql, useRefetchableFragment, useSubscription } from 'react-relay';

import type { QuestionCarouselFragment$key } from '@local/__generated__/QuestionCarouselFragment.graphql';
import type { QuestionCarouselAddedSubscription } from '@local/__generated__/QuestionCarouselAddedSubscription.graphql';
import type { QuestionCarouselRemovedSubscription } from '@local/__generated__/QuestionCarouselRemovedSubscription.graphql';
import { useEvent } from '@local/features/events';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    },
    btn: {
        color: 'white',
    },
    card: {
        minHeight: 150,
    },
}));

const QUESTION_CAROUSEL_FRAGMENT = graphql`
    fragment QuestionCarouselFragment on Event
    @refetchable(queryName: "QuestionCarouselFragmentRefetchable")
    @argumentDefinitions(first: { type: Int, defaultValue: 100 }, after: { type: String, defaultValue: "" }) {
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
                        ...QuestionContentFragment
                    }
                }
            }
        }
    }
`;

export const QUESTION_CAROUSEL_ADDED_SUBSCRIPTION = graphql`
    subscription QuestionCarouselAddedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionAddedToRecord(eventId: $eventId) @appendEdge(connections: $connections) {
            node {
                id
                ...QuestionAuthorFragment
                ...QuestionContentFragment
            }
        }
    }
`;

export const QUESTION_CAROUSEL_REMOVED_SUBSCRIPTION = graphql`
    subscription QuestionCarouselRemovedSubscription($eventId: ID!, $connections: [ID!]!) {
        questionRemovedFromRecord(eventId: $eventId) {
            node {
                id @deleteEdge(connections: $connections)
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
    const classes = useStyles();
    const [data, refetch] = useRefetchableFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const [state, dispatch] = useReducer<typeof reducer>(reducer, { idx: -1, currQuestionIdx: -1 });
    const { eventId } = useEvent();
    const questionCarouselAddedConfig = useMemo<GraphQLSubscriptionConfig<QuestionCarouselAddedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: data.questionQueue?.questionRecord?.__id ? [data.questionQueue.questionRecord.__id] : [],
            },
            subscription: QUESTION_CAROUSEL_ADDED_SUBSCRIPTION,
        }),
        [eventId, data.questionQueue?.questionRecord?.__id]
    );
    const questionCarouselRemovedConfig = useMemo<GraphQLSubscriptionConfig<QuestionCarouselRemovedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: data.questionQueue?.questionRecord?.__id ? [data.questionQueue.questionRecord.__id] : [],
            },
            subscription: QUESTION_CAROUSEL_ADDED_SUBSCRIPTION,
        }),
        [eventId, data.questionQueue?.questionRecord?.__id]
    );
    useSubscription(questionCarouselAddedConfig);
    useSubscription(questionCarouselRemovedConfig);

    // somewhat redundant, but ensures that everything is sorted
    const sortedQuestions = useMemo(
        () =>
            data.questionQueue?.questionRecord?.edges
                ?.slice(0)
                .sort((edgeA, edgeB) =>
                    edgeA.node.position && edgeB.node.position ? edgeA.node.position - edgeB.node.position : 0
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
        <Paper className={classes.root}>
            <Grid container justify='space-between'>
                <IconButton
                    disabled={state.idx === 0 || state.idx === -1}
                    className={classes.btn}
                    onClick={() => dispatch({ type: 'previous' })}
                >
                    <ChevronLeft />
                </IconButton>
                <Button onClick={() => dispatch({ type: 'goToCurrent' })} className={classes.btn}>
                    {state.idx === state.currQuestionIdx ? 'Answering Now' : 'Go To Current'}
                </Button>
                <IconButton
                    disabled={state.currQuestionIdx === state.idx || state.idx === -1}
                    className={classes.btn}
                    onClick={() => dispatch({ type: 'next' })}
                >
                    <ChevronRight />
                </IconButton>
            </Grid>
            <Grid
                component={Card}
                elevation={0}
                className={classes.card}
                container
                alignItems='center'
                justify='center'
            >
                {displayedQuestion ? (
                    <Grid item xs={12}>
                        <QuestionAuthor fragmentRef={displayedQuestion.node} />
                        <QuestionContent fragmentRef={displayedQuestion.node} />
                    </Grid>
                ) : (
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' align='center'>
                            No question to display :(
                        </Typography>
                    </CardContent>
                )}
            </Grid>
        </Paper>
    );
}
