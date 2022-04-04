/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Card, List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';

import { QuestionActions } from '../QuestionActions';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import { QuestionQuote } from '../QuestionQuote';
import { QuestionStats } from '../QuestionStats';
import { useQuestionList } from './useQuestionList';
import { useQuestionCreated } from './useQuestionCreated';
import { useQuestionUpdated } from './useQuestionUpdated';
import { useQuestionDeleted } from './useQuestionDeleted';
import { Loader } from '@local/components/Loader';
import { OperationType } from 'relay-runtime';
import { LoadMoreFn } from 'react-relay';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    fragmentRef: useQuestionListFragment$key;
}

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1.5),
    },
    listFilter: {
        flex: 1,
    },
    content: {
        height: 0, // flex box recalculates this -- explanation:  https://stackoverflow.com/a/14964944
        flex: '1 1 100%',
    },
    questionActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(0.5),
        borderRadius: '10px',
    },
    filler: {
        visibility: 'hidden',
    },
    text: {
        margin: 'auto',
    },
}));

interface InfiniteScrollerProps {
    children: React.ReactNode | React.ReactNodeArray;
    isModerator: boolean;
    filteredList: Array<any>;
    loadNext: LoadMoreFn<OperationType>;
    hasNext: boolean;
}

export function InfiniteScroller({ children, isModerator, filteredList, loadNext, hasNext }: InfiniteScrollerProps) {
    return isModerator ? (
        <InfiniteScroll
            dataLength={filteredList.length}
            next={() => loadNext(10)}
            hasMore={hasNext}
            loader={<Loader />}
            hasChildren
            scrollableTarget='event-sidebar-scroller'
        >
            {children}
        </InfiniteScroll>
    ) : (
        <>{children}</>
    );
}

export function QuestionList({ className, style, fragmentRef }: Props) {
    const classes = useStyles();
    const [user] = useUser();
    const { isModerator } = useEvent();
    const { questions, connections, loadNext, hasNext } = useQuestionList({ fragmentRef });
    const MAX_QUESTIONS_DISPLAYED = 50;
    useQuestionCreated({ connections });
    useQuestionUpdated({ connections });
    useQuestionDeleted({ connections });
    // const [isPaused, setIsPaused] = React.useState();

    // function togglePause() {}

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    return (
        <Grid alignContent='flex-start' container className={clsx(classes.root, className)} style={style}>
            <ListFilter
                className={classes.listFilter}
                // filterMap={filterFuncs}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
                // menuIcons={[
                //     <Tooltip title='Load New'>
                //         <span>
                //             <IconButton color='inherit' onClick={togglePause}>
                //                 <Badge badgeContent={isPaused ? 0 : 0} color='secondary'>
                //                     {isPaused ? <PlayArrow /> : <Pause />}
                //                 </Badge>
                //             </IconButton>
                //         </span>
                //     </Tooltip>,
                // ]}
            />
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={12}>
                        <List disablePadding>
                            {/* TODO: Restore Later 
                            <Grid container alignItems='center'>
                                <Typography className={classes.text} variant='body2'>
                                    <b>{filteredList.length <= MAX_QUESTIONS_DISPLAYED ? filteredList.length : MAX_QUESTIONS_DISPLAYED}</b>
                                    &nbsp; Questions Displayed
                                </Typography>
                            </Grid> */}
                            <InfiniteScroller
                                isModerator={isModerator}
                                filteredList={filteredList}
                                hasNext={hasNext}
                                loadNext={loadNext}
                            >
                                {(isModerator ? filteredList : filteredList.slice(0, MAX_QUESTIONS_DISPLAYED)).map(
                                    (question) => (
                                        <ListItem disableGutters key={question.id}>
                                            <Card className={classes.item}>
                                                <QuestionAuthor fragmentRef={question} />
                                                {question.refQuestion && (
                                                    <QuestionQuote fragmentRef={question.refQuestion} />
                                                )}
                                                <QuestionContent fragmentRef={question} />
                                                <Grid container alignItems='center' justifyContent='space-between'>
                                                    {isModerator && <QuestionStats fragmentRef={question} />}
                                                    <QuestionActions
                                                        style={
                                                            !isModerator
                                                                ? { width: '100%' }
                                                                : { width: '100%', maxWidth: '10rem' }
                                                        }
                                                        className={classes.questionActions}
                                                        likeEnabled={!isModerator && Boolean(user)}
                                                        quoteEnabled={!isModerator && Boolean(user)}
                                                        queueEnabled={isModerator && Boolean(user)}
                                                        deleteEnabled={isModerator && Boolean(user)}
                                                        connections={connections}
                                                        fragmentRef={question}
                                                    />
                                                    {isModerator && ( // filler to justify moderator queue button
                                                        <span className={classes.filler}>
                                                            <QuestionStats fragmentRef={question} />
                                                        </span>
                                                    )}
                                                </Grid>
                                            </Card>
                                        </ListItem>
                                    )
                                )}
                            </InfiniteScroller>
                            {filteredList.length === 0 && questions.length !== 0 && (
                                <Typography align='center' variant='body2'>
                                    No results to display
                                </Typography>
                            )}
                            {questions.length === 0 && (
                                <Typography align='center' variant='h5'>
                                    No Questions to display :(
                                </Typography>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}
