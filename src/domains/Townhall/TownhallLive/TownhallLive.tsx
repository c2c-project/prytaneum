import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, AppBar, Tabs, Tab, Grid, Paper } from '@material-ui/core';

import VideoPlayer from 'components/VideoPlayer';
import { DeviceContext } from 'contexts/Device';
import { TownhallContext } from '../Contexts/Townhall';
import MyQuestions from '../MyQuestions';

type TabNames = 'my-questions' | 'all-questions';
function TownhallLiveTabs() {
    const [currentTab, setCurrentTab] = React.useState<TabNames>(
        'my-questions'
    );
    const getContent = () =>
        ({
            'my-questions': <MyQuestions />,
            'all-questions': <div>TODO</div>,
        }[currentTab]);
    return (
        <div>
            <AppBar position='static' color='transparent' elevation={0}>
                <Tabs value={currentTab} variant='fullWidth'>
                    <Tab
                        value='my-questions'
                        label='My Questions'
                        onClick={() => setCurrentTab('my-questions')}
                    />
                    <Tab
                        value='all-questions'
                        label='All Questions'
                        onClick={() => setCurrentTab('all-questions')}
                    />
                </Tabs>
                <Divider />
            </AppBar>
            <div style={{ overflowX: 'hidden' }}>{getContent()}</div>
        </div>
    );
}
const useMobileStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    bottom: {
        paddingBottom: theme.spacing(3),
    },
    paper: {
        paddingBottom: theme.spacing(1),
        borderRadius: '0px',
        height: '100%',
    },
}));

function MobileLive() {
    const { form } = React.useContext(TownhallContext);
    const classes = useMobileStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <VideoPlayer url={form.url} />
                    </Grid>
                    <Grid item xs={12} className={classes.bottom}>
                        <TownhallLiveTabs />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

const useDesktopStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

function DesktopLive() {
    const { form } = React.useContext(TownhallContext);
    const classes = useDesktopStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <VideoPlayer url={form.url} />
                </Grid>
                <Grid item xs={12}>
                    <TownhallLiveTabs />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function TownhallLive() {
    const device = React.useContext(DeviceContext);

    switch (device) {
        case 'desktop':
            return <DesktopLive />;
        case 'mobile':
            return <MobileLive />;
        default:
            return <DesktopLive />;
    }
}
