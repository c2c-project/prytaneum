import * as React from 'react';
import { Card, CardContent, Grid, Typography, CardActions, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { useEvent } from '../useEvent';
import { LiveFeedbackReplyAction } from './LiveFeedbackReplyAction';
import { LiveFeedbackReply } from './LiveFeedbackReply';
import { SubmitLiveFeedback } from './SubmitLiveFeedback';
import { ListActionsContainer, ListContainer, ListToolbar } from '@local/components/ui/List';

interface LiveFeedbackListProps {
    fragmentRef: useLiveFeedbackListFragment$key;
    isVisible: boolean;
    setNumOfFeedbackMsgs?: React.Dispatch<React.SetStateAction<number>>;
}

export function LiveFeedbackList({ fragmentRef, isVisible, setNumOfFeedbackMsgs }: LiveFeedbackListProps) {
    const { user } = useUser();
    const [displayLiveFeedback, setDisplayLiveFeedback] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { liveFeedback, connections } = useLiveFeedbackList({ fragmentRef });
    const { isModerator, eventId } = useEvent();
    // const [prevMsgLength, setPrevMsgLength] = React.useState<number>(0);
    const numOfMessages = React.useMemo(() => liveFeedback.length, [liveFeedback]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const prevMsgLength = React.useMemo(() => numOfMessages, [isVisible]);

    React.useEffect(() => {
        if (!setNumOfFeedbackMsgs) return;
        if (isVisible) setNumOfFeedbackMsgs(0);
        else {
            setNumOfFeedbackMsgs(numOfMessages - prevMsgLength);
        }
    }, [isVisible, numOfMessages, prevMsgLength, setNumOfFeedbackMsgs]);

    const toggleSearch = React.useCallback(() => setIsSearchOpen((prev) => !prev), [setIsSearchOpen]);

    const accessors = React.useMemo<Accessors<ArrayElement<typeof liveFeedback>>[]>(
        () => [
            (f) => f?.message || '', // feedback text itself
            (f) => f?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(liveFeedback, accessors);

    // Virtualized List variables and functions
    const listLength = React.useMemo(() => filteredList.length, [filteredList]);

    const cache = new CellMeasurerCache({
        defaultHeight: 136,
        minHeight: 136,
        fixedWidth: true,
    });

    interface RowRendererProps {
        index: number;
        isScrolling: boolean;
        key: string;
        parent: MeasuredCellParent;
        style: React.CSSProperties;
    }

    function rowRenderer({ index: rowIndex, key, parent, style }: RowRendererProps) {
        const feedback = filteredList[rowIndex];

        const isMyMessage = feedback.createdBy?.id === user?.id;

        return (
            <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={rowIndex}>
                {({ registerChild }) => (
                    // 'style' attribute required to position cell (within parent List)
                    <div ref={registerChild as any} style={{ ...style, width: '100%', padding: '.5rem' }}>
                        <Card style={{ flex: 1, flexDirection: 'column' }}>
                            <LiveFeedbackAuthor fragmentRef={feedback} />
                            {feedback.refFeedback && <LiveFeedbackReply fragmentRef={feedback.refFeedback} />}
                            <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
                                <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                                    {feedback.message}
                                </Typography>
                            </CardContent>
                            {isMyMessage ? (
                                <React.Fragment />
                            ) : (
                                <CardActions>
                                    <LiveFeedbackReplyAction fragmentRef={feedback} connections={connections} />
                                </CardActions>
                            )}
                        </Card>
                    </div>
                )}
            </CellMeasurer>
        );
    }

    React.useEffect(() => {
        if (!user) setDisplayLiveFeedback(false);
        else setDisplayLiveFeedback(true);
    }, [user, isModerator]);

    if (!isVisible) return <React.Fragment />;

    return (
        <ListContainer>
            <ListToolbar>
                <ListActionsContainer isExpanded={isSearchOpen}>
                    <Grid item xs='auto'>
                        {user ? (
                            <IconButton
                                color={isSearchOpen ? 'primary' : 'default'}
                                aria-label='search-icon-button'
                                onClick={toggleSearch}
                            >
                                <Tooltip title='Search Bar' placement='top'>
                                    <SearchIcon fontSize='large' />
                                </Tooltip>
                            </IconButton>
                        ) : (
                            <React.Fragment />
                        )}
                    </Grid>
                    <SubmitLiveFeedback eventId={eventId} connections={connections} />
                    {isModerator ? null : (
                        <Tooltip title='Submit any feedback or questions directly to the event moderators.'>
                            <InfoIcon sx={{ color: 'primary.main' }} />
                        </Tooltip>
                    )}
                </ListActionsContainer>
                <ListFilter
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    isSearchOpen={isSearchOpen}
                    length={filteredList.length}
                    displayNumResults={Boolean(user)} // only display for users logged in
                />
            </ListToolbar>
            {displayLiveFeedback && filteredList.length === 0 && (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    No feedback to display
                </Typography>
            )}
            {displayLiveFeedback ? (
                <div style={{ width: '100%', height: '100%' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <VirtualizedList
                                height={height}
                                width={width}
                                rowCount={listLength}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            ) : (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    Sign in to submit Live Feedback
                </Typography>
            )}
        </ListContainer>
    );
}
