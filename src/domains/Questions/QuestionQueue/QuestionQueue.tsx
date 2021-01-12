import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import TabPanel, { TabPanels } from 'components/TabPanel';
import ChipTab from 'components/ChipTab';
import Queue from './Queue';
import useQuestionQueue from './useQuestionQueue';
import SuggestedFeed from '../SuggestedFeed';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    item: {
        marginBottom: theme.spacing(2),
    },
}));

type Tabs = 'queued' | 'suggested';

export default function QuestionQueue() {
    const [playlist, dispatch] = useQuestionQueue();
    const classes = useStyles();
    const [tab, setTab] = React.useState<Tabs>('queued');
    function handleTabChange(tabName: Tabs) {
        return () => setTab(tabName);
    }

    const suggestedMinusQueued = React.useMemo(
        () =>
            playlist.suggested.filter(({ _id }) => {
                const isQueued =
                    playlist.queue.find(({ _id: inner }) => _id === inner) ===
                    undefined;
                const isinBuffer =
                    playlist.buffer.queue.find(
                        ({ _id: inner }) => _id === inner
                    ) === undefined;
                return isQueued && isinBuffer;
            }),
        [playlist]
    );
    const handleSuggestedFlush = React.useCallback(() => {
        dispatch({ type: 'flush-suggested-buffer' });
    }, [dispatch]);
    const handleBufferFlush = React.useCallback(() => {
        dispatch({ type: 'flush-queue-buffer' });
    }, [dispatch]);
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs='auto' className={classes.item}>
                    <ChipTab
                        onClick={handleTabChange('queued')}
                        selected={tab === 'queued'}
                        label='Queued'
                    />
                    <ChipTab
                        onClick={handleTabChange('suggested')}
                        selected={tab === 'suggested'}
                        label='Suggested'
                    />
                </Grid>
                <TabPanels>
                    <TabPanel visible={tab === 'queued'}>
                        <Queue
                            onFlushBuffer={handleBufferFlush}
                            questions={playlist.queue}
                            bufferLength={playlist.buffer.queue.length}
                        />
                    </TabPanel>
                    <TabPanel visible={tab === 'suggested'}>
                        <SuggestedFeed
                            bufferSize={playlist.buffer.suggested.length}
                            questions={suggestedMinusQueued}
                            onFlushBuffer={handleSuggestedFlush}
                        />
                    </TabPanel>
                </TabPanels>
            </Grid>
        </div>
    );
}
