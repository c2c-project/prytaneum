import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import TabPanel, { TabPanels } from 'components/TabPanel';
import ChipTab from 'components/ChipTab';
import Queue from './Queue';
import useQuestionQueue from './useQuestionQueue';
import SuggestedFeed from './SuggestedFeed';

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
    const handleFlush = React.useCallback(() => {
        dispatch({ type: 'flush-suggested-buffer' });
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
                        <Queue questions={playlist.queue} />
                    </TabPanel>
                    <TabPanel visible={tab === 'suggested'}>
                        <SuggestedFeed
                            bufferSize={playlist.buffer.suggested.length}
                            questions={playlist.suggested}
                            onFlushBuffer={handleFlush}
                        />
                    </TabPanel>
                </TabPanels>
            </Grid>
        </div>
    );
}
