/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Card, Grid, List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useBroadcastMessageListFragment$key } from '@local/__generated__/useBroadcastMessageListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
// import { useUser } from '@local/features/accounts';

import { useBroadcastMessageDeleted } from './useBroadcastMessageDeleted';
import { useBroadcastMessageCreated } from './useBroadcastMessageCreated';
import { Loader } from '@local/components/Loader';
import { OperationType } from 'relay-runtime';
import { LoadMoreFn } from 'react-relay';
import { useBroadcastMessageList } from './useBroadcastMessageList';
import { BroadcastMessageAuthor } from '../BroadcastMessageAuthor';
import { BroadcastMessageContent } from '../BroadcastMessageContent';
import { BroadcastMessageActions } from '../BroadcastMessageActions/BroadcastMessageActions';
import { useUser } from '@local/features/accounts';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    fragmentRef: useBroadcastMessageListFragment$key;
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
    broadcastMessageActions: {
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

export function BroadcastMessageList({ className, style, fragmentRef }: Props) {
    const classes = useStyles();
    const [user] = useUser();
    const { isModerator } = useEvent();
    const { broadcastMessages, connections, loadNext, hasNext, MAX_MESSAGES_DISPLAYED } = useBroadcastMessageList({
        fragmentRef,
    });
    useBroadcastMessageCreated({ connections });
    useBroadcastMessageDeleted({ connections });

    const accessors = React.useMemo<Accessors<ArrayElement<typeof broadcastMessages>>[]>(
        () => [
            (q) => q?.broadcastMessage || '', // broadcast message text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(broadcastMessages, accessors);

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
                                    <b>{filteredList.length <= MAX_MESSAGES_DISPLAYED ? filteredList.length : MAX_MESSAGES_DISPLAYED}</b>
                                    &nbsp; Questions Displayed
                                </Typography>
                            </Grid> */}
                            <InfiniteScroller
                                isModerator={isModerator}
                                filteredList={filteredList}
                                hasNext={hasNext}
                                loadNext={loadNext}
                            >
                                {(isModerator ? filteredList : filteredList.slice(0, MAX_MESSAGES_DISPLAYED)).map(
                                    (broadcastMessage) => (
                                        <ListItem disableGutters key={broadcastMessage.id}>
                                            <Card className={classes.item}>
                                                <BroadcastMessageAuthor fragmentRef={broadcastMessage} />
                                                <BroadcastMessageContent fragmentRef={broadcastMessage} />
                                                <Grid container alignItems='center' justifyContent='space-between'>
                                                    <BroadcastMessageActions
                                                        style={
                                                            !isModerator
                                                                ? { width: '100%' }
                                                                : { width: '100%', maxWidth: '10rem' }
                                                        }
                                                        className={classes.broadcastMessageActions}
                                                        deleteEnabled={isModerator && Boolean(user)}
                                                        connections={connections}
                                                        fragmentRef={broadcastMessage}
                                                    />
                                                </Grid>
                                                {/* <p>{broadcastMessage.broadcastMessage}</p> */}
                                            </Card>
                                        </ListItem>
                                    )
                                )}
                            </InfiniteScroller>
                            {filteredList.length === 0 && broadcastMessages.length !== 0 && (
                                <Typography align='center' variant='body2'>
                                    No results to display
                                </Typography>
                            )}
                            {broadcastMessages.length === 0 && (
                                <Typography align='center' variant='h5'>
                                    No broadcasted messages to display :(
                                </Typography>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}
