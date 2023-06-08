/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { OperationType } from 'relay-runtime';
import { LoadMoreFn } from 'react-relay';
import { Grid, Card, List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { useViewerOnlyQuestionListFragment$key } from '@local/__generated__/useViewerOnlyQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';

import { QuestionActions } from '../QuestionActions';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import { QuestionQuote } from '../QuestionQuote';
import { QuestionStats } from '../QuestionStats';
import { Loader } from '@local/components/Loader';
import { useViewerOnlyQuestionList } from './useViewerOnlyQuestionList';
import { useViewerOnlyQuestionCreated } from './useViewerOnlyQuestionCreated';
import { useViewerOnlyQuestionUpdated } from './useViewerOnlyQuestionUpdated';
import { useViewerOnlyQuestionDeleted } from './useViewerOnlyQuestionDeleted';

const useStyles = makeStyles((theme) => ({
    listFilter: {
        flex: 1,
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
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
            scrollableTarget='scrollable-tab'
        >
            {children}
        </InfiniteScroll>
    ) : (
        <>{children}</>
    );
}

interface ViewerOnlyQuestionListProps {
    fragmentRef: useViewerOnlyQuestionListFragment$key;
    ActionButtons: React.ReactNode;
    isVisible: boolean;
}

export function ViewerOnlyQuestionList({ fragmentRef, ActionButtons, isVisible }: ViewerOnlyQuestionListProps) {
    const classes = useStyles();
    const { user } = useUser();
    const { isModerator } = useEvent();
    const { questions, connections, loadNext, hasNext } = useViewerOnlyQuestionList({ fragmentRef });
    const MAX_QUESTIONS_DISPLAYED = 50;
    useViewerOnlyQuestionCreated({ connections });
    useViewerOnlyQuestionUpdated();
    useViewerOnlyQuestionDeleted({ connections });
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

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container height={0} padding={0} flex='1 1 100%' justifyContent='center'>
            <Grid item paddingTop='1rem' width='100%'>
                {ActionButtons}
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
                                <ListItem disableGutters key={question.id} sx={{ paddingX: '0.5rem' }}>
                                    <Card className={classes.item}>
                                        <QuestionAuthor fragmentRef={question} />
                                        {question.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
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
    );
}
