/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Card, List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme, alpha } from '@mui/material/styles';
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

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1.5),
    },
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
            scrollableTarget='event-sidebar-scroller'
        >
            {children}
        </InfiniteScroll>
    ) : (
        <>{children}</>
    );
}

interface QuestionListProps {
    fragmentRef: useQuestionListFragment$key;
    ActionButtons: React.ReactNode;
    isVisible: boolean;
}

export function QuestionList({ fragmentRef, ActionButtons, isVisible }: QuestionListProps) {
    const theme = useTheme();
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
        <Grid container height={0} flex='1 1 100%' sx={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <Grid
                    item
                    paddingTop='1rem'
                    xs={12}
                    sx={{
                        border: 5,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                            theme.palette.custom.creamCan,
                            0.06
                        )}) 10`,
                        backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                    }}
                >
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
            )}
        </Grid>
    );
}
