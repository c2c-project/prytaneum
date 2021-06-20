// import * as React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
// import { IconButton, Typography, Divider, Grid, Button } from '@material-ui/core';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// import { EventQuestion as Question } from '@local/graphql-types';
// // import { incrementQueue, decrementQueue, jumpToCurrent } from '@local/reducers';
// // import usePlaylist from '../usePlaylist';
// // import QuestionCard from '../QuestionCard';

// export interface CarouselProps {
//     question: Question | undefined;
//     onClickNext: () => void;
//     onClickPrev: () => void;
//     hasNext: boolean;
//     hasPrev: boolean;
//     onClickJump: () => void;
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//     },

//     flex: {
//         flex: '1 1 100%',
//         padding: theme.spacing(0, 1),
//         width: '100%',
//     },
//     hide: {
//         visibility: 'hidden',
//     },
// }));

// export function QuestionCarousel({ question, onClickNext, onClickPrev, hasNext, hasPrev, onClickJump }: CarouselProps) {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             {/* <div className={classes.flex}> */}
//             {question && <div>todod</div>}
//             {!question && <Typography>No Question to display yet</Typography>}
//             {/* </div> */}
//             <Divider />
//             <Grid container justify='space-between'>
//                 <IconButton onClick={onClickPrev} disabled={!hasPrev}>
//                     <ChevronLeftIcon />
//                 </IconButton>
//                 <Button disabled={!hasNext} onClick={onClickJump}>
//                     Go to Current
//                 </Button>
//                 <IconButton onClick={onClickNext} disabled={!hasNext}>
//                     <ChevronRightIcon />
//                 </IconButton>
//             </Grid>
//         </div>
//     );
// }

// export default function CurrentQuestion() {
//     const [playlist, dispatch] = usePlaylist();
//     const { position, queue, max } = playlist;

//     function handleClick(dir: -1 | 1) {
//         return () => {
//             if (position + dir < 0) return;
//             if (position + dir > queue.length) return;
//             dispatch(dir === 1 ? incrementQueue() : decrementQueue());
//         };
//     }

//     return (
//         <QuestionCarousel
//             question={queue[position]}
//             onClickPrev={handleClick(-1)}
//             onClickNext={handleClick(1)}
//             hasNext={position < max}
//             hasPrev={position > 0}
//             onClickJump={() => dispatch(jumpToCurrent())}
//         />
//     );
// }

import { useMemo } from 'react';
import { Card, Paper, Button, IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { graphql, useFragment } from 'react-relay';

import type { QuestionCarouselFragment$key } from '@local/__generated__/QuestionCarouselFragment.graphql';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    btn: {
        color: 'white',
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
            <Card elevation={0}>
                {currQuestion ? (
                    <>
                        <QuestionAuthor fragmentRef={currQuestion.node} />
                        <QuestionContent fragmentRef={currQuestion.node} />
                    </>
                ) : (
                    <div>nothing</div>
                )}
            </Card>
        </Paper>
    );
}
