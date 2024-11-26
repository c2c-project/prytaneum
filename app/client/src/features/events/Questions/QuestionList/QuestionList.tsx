import * as React from 'react';
import { Grid, Typography, IconButton, Stack, Badge, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import type { IndexRange } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';

import { QuestionActions } from '../QuestionActions';
import { FormattedQuestionData, useQuestionList } from './hooks/useQuestionList';
import { useQuestionCreated, useQuestionDeleted, useQuestionUpdated } from './hooks';
import AskQuestion from '../AskQuestion';
import {
    QuestionCard,
    QuestionAuthor,
    QuestionContent,
    QuestionQuote,
    QuestionStats,
} from '@local/components/ui/Question';
import { FilterFunc } from '@local/utils/filters';
import { QUESTIONS_BATCH_SIZE } from '@local/utils/rules';
import { ListActionsContainer, ListContainer, ListToolbar } from '@local/components/ui/List';

interface RowRendererProps {
    index: number;
    isScrolling: boolean;
    key: string;
    parent: MeasuredCellParent;
    style: React.CSSProperties;
}

interface QuestionListProps {
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
    isFrozen: boolean;
    questions: FormattedQuestionData[];
    filteredList: FormattedQuestionData[];
    frozenQuestions: FormattedQuestionData[];
    connections: string[];
    handleFilterChange: (filters: FilterFunc<FormattedQuestionData>[]) => void;
    handleSearch: (s: string) => void;
    loadMoreRows: ({}: IndexRange) => Promise<void>;
    togglePause: () => void;
}

export function QuestionList({
    askQuestionEnabled,
    searchOnly,
    isFrozen,
    questions,
    filteredList,
    frozenQuestions,
    connections,
    handleFilterChange,
    handleSearch,
    loadMoreRows,
    togglePause,
}: QuestionListProps) {
    const theme = useTheme();
    const { user } = useUser();
    const { isModerator, eventId } = useEvent();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const toggleSearch = React.useCallback(() => setIsSearchOpen((prev) => !prev), [setIsSearchOpen]);

    // Virtualized List variables and functions
    const listLength = React.useMemo(
        () => (isFrozen ? frozenQuestions.length : filteredList.length),
        [filteredList.length, frozenQuestions.length, isFrozen]
    );
    const isRowLoaded = ({ index }: { index: number }) => !!filteredList[index + 1];

    const cache = new CellMeasurerCache({
        defaultHeight: 185,
        minHeight: 148,
        fixedWidth: true,
    });

    function rowRenderer({ index: rowIndex, key, parent, style }: RowRendererProps) {
        const question = isFrozen ? frozenQuestions[rowIndex] : filteredList[rowIndex];

        return (
            <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={rowIndex}>
                {({ registerChild, measure }) => (
                    // 'style' attribute required to position cell (within parent List)
                    <div ref={registerChild as any} style={{ ...style, width: '100%', padding: '.5rem' }}>
                        <QuestionCard>
                            <QuestionAuthor fragmentRef={question} />
                            {question?.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
                            <QuestionContent fragmentRef={question} measure={measure} />
                            <Grid container alignItems='center' justifyContent='space-between'>
                                {isModerator && <QuestionStats fragmentRef={question} />}
                                <QuestionActions
                                    style={!isModerator ? { width: '100%' } : { width: '100%', maxWidth: '10rem' }}
                                    likeEnabled={!isModerator && Boolean(user) && askQuestionEnabled}
                                    quoteEnabled={!isModerator && Boolean(user) && askQuestionEnabled}
                                    queueEnabled={isModerator && Boolean(user)}
                                    deleteEnabled={isModerator && Boolean(user)}
                                    connections={connections}
                                    fragmentRef={question}
                                />
                                {isModerator && ( // filler to justify moderator queue button
                                    <span style={{ visibility: 'hidden' }}>
                                        <QuestionStats fragmentRef={question} />
                                    </span>
                                )}
                            </Grid>
                        </QuestionCard>
                    </div>
                )}
            </CellMeasurer>
        );
    }

    return (
        <ListContainer>
            <ListToolbar>
                {!searchOnly && (
                    <ListActionsContainer isExpanded={isSearchOpen}>
                        <Grid item xs='auto'>
                            <IconButton onClick={togglePause}>
                                {isFrozen ? (
                                    <Badge badgeContent={questions.length - frozenQuestions.length} color='secondary'>
                                        <Tooltip title='Un-Pause Question List'>
                                            <PlayCircleIcon
                                                fontSize='large'
                                                sx={{ color: theme.palette.primary.main }}
                                            />
                                        </Tooltip>
                                    </Badge>
                                ) : (
                                    <Tooltip title='Pause Question List' placement='top'>
                                        <PauseCircleIcon fontSize='large' sx={{ color: theme.palette.primary.main }} />
                                    </Tooltip>
                                )}
                            </IconButton>
                            <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                                <Tooltip title='Search Bar' placement='top'>
                                    <SearchIcon fontSize='large' />
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        {!isModerator && askQuestionEnabled && (
                            <AskQuestion eventId={eventId} connections={connections} />
                        )}
                        <Tooltip title='Submit questions related to the event.'>
                            <InfoIcon sx={{ color: 'primary.main' }} />
                        </Tooltip>
                    </ListActionsContainer>
                )}
                <ListFilter
                    // filterMap={filterFuncs}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    length={filteredList.length}
                    isSearchOpen={searchOnly || isSearchOpen}
                    isFrozen={isFrozen}
                />
            </ListToolbar>
            {filteredList.length === 0 && questions.length !== 0 && (
                <Typography align='center' variant='body2' marginTop='1rem'>
                    No results to display
                </Typography>
            )}
            {questions.length === 0 && (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        No Questions to display
                        <SentimentDissatisfiedIcon />
                    </Stack>
                </Typography>
            )}
            <div style={{ width: '100%', height: '100%' }}>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    minimumBatchSize={QUESTIONS_BATCH_SIZE}
                    rowCount={listLength}
                    threshold={5}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <VirtualizedList
                                    ref={registerChild}
                                    height={height}
                                    width={width}
                                    rowCount={listLength}
                                    deferredMeasurementCache={cache}
                                    rowHeight={cache.rowHeight}
                                    rowRenderer={rowRenderer}
                                    onRowsRendered={onRowsRendered}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        </ListContainer>
    );
}

interface QestionListContainerProps {
    fragmentRef: useQuestionListFragment$key;
    isVisible: boolean;
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
}

export function QuestionListContainer({
    fragmentRef,
    isVisible,
    askQuestionEnabled = true,
    searchOnly = false,
}: QestionListContainerProps) {
    const { questions, connections, loadNext, hasNext } = useQuestionList({ fragmentRef });
    const [isFrozen, setIsFrozen] = React.useState(false);
    const [frozenQuestions, setFrozenQuestions] = React.useState<typeof questions>(questions);
    useQuestionCreated({ connections });
    useQuestionUpdated({ connections });
    useQuestionDeleted({ connections });

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    function togglePause() {
        setIsFrozen((prev) => !prev);
        setFrozenQuestions(questions);
    }

    const loadMoreRows = React.useCallback(
        async ({}: IndexRange) => {
            if (hasNext) loadNext(QUESTIONS_BATCH_SIZE);
        },
        [hasNext, loadNext]
    );

    if (!isVisible) return <React.Fragment />;

    return (
        <QuestionList
            askQuestionEnabled={askQuestionEnabled}
            searchOnly={searchOnly}
            isFrozen={isFrozen}
            questions={questions}
            filteredList={filteredList}
            frozenQuestions={frozenQuestions}
            connections={connections}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
            loadMoreRows={loadMoreRows}
            togglePause={togglePause}
        />
    );
}
