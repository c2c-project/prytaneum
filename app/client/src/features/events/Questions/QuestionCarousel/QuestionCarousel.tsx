import { useMemo } from 'react';
import { Card, Paper, Button, IconButton, Grid, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { graphql, useFragment } from 'react-relay';

import type { QuestionCarouselFragment$key } from '@local/__generated__/QuestionCarouselFragment.graphql';
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
    @argumentDefinitions(first: { type: Int, defaultValue: 100 }, after: { type: String, defaultValue: "" }) {
        id
        currentQuestion
        queuedQuestions(first: $first, after: $after) @connection(key: "QuestionCarousel_queuedQuestions") {
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
`;

export interface QuestionCarouselProps {
    fragmentRef: QuestionCarouselFragment$key;
}

export function QuestionCarousel({ fragmentRef }: QuestionCarouselProps) {
    const classes = useStyles();
    const data = useFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const currQuestionIdx = useMemo(
        () =>
            data.queuedQuestions?.edges?.findIndex(
                ({ node }) => node.position !== null && node.position === data.currentQuestion
            ),
        [data]
    );

    // probably a better way to do this, but whatever
    const currQuestion = useMemo(
        () =>
            currQuestionIdx !== null &&
            currQuestionIdx !== -1 &&
            currQuestionIdx !== undefined &&
            data.queuedQuestions &&
            data.queuedQuestions.edges
                ? data.queuedQuestions.edges[currQuestionIdx]
                : null,
        [currQuestionIdx, data]
    );

    return (
        <Paper className={classes.root}>
            <Grid container justify='space-between'>
                <IconButton className={classes.btn}>
                    <ChevronLeft />
                </IconButton>
                <Button className={classes.btn}>Answering Now</Button>
                <IconButton className={classes.btn}>
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
                {currQuestion ? (
                    <Grid item xs={12}>
                        <QuestionAuthor fragmentRef={currQuestion.node} />
                        <QuestionContent fragmentRef={currQuestion.node} />
                    </Grid>
                ) : (
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' align='center'>
                            No Question to display :(
                        </Typography>
                    </CardContent>
                )}
            </Grid>
        </Paper>
    );
}
