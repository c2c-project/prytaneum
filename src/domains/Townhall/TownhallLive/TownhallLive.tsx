import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Divider,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Paper,
    Typography,
    useScrollTrigger,
} from '@material-ui/core';

import VideoPlayer from 'components/VideoPlayer';
import { DeviceContext } from 'contexts/Device';
import { TownhallContext } from '../Contexts/Townhall';
// import MyQuestions from '../MyQuestions';
import QuestionFeed from '../QuestionFeed';

type TabNames = 'my-questions' | 'all-questions';
// function TownhallLiveTabs() {
//     const [currentTab, setCurrentTab] = React.useState<TabNames>(
//         'my-questions'
//     );
//     const getContent = () =>
//         ({
//             'my-questions': <MyQuestions />,
//             'all-questions': <div>TODO</div>,
//         }[currentTab]);
//     return (
//         <div>
//             <AppBar position='static' color='transparent' elevation={0}>
//                 <Tabs value={currentTab} variant='fullWidth'>
//                     <Tab
//                         value='my-questions'
//                         label='My Questions'
//                         onClick={() => setCurrentTab('my-questions')}
//                     />
//                     <Tab
//                         value='all-questions'
//                         label='All Questions'
//                         onClick={() => setCurrentTab('all-questions')}
//                     />
//                 </Tabs>
//                 <Divider />
//             </AppBar>
//             <div style={{ overflowX: 'hidden' }}>{getContent()}</div>
//         </div>
//     );
// }
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
        minHeight: '100%',
        overflow: 'hidden',
    },
    feed: {
        overflowY: 'scroll',
    },
}));

function MobileLive() {
    const { form } = React.useContext(TownhallContext);
    const classes = useMobileStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <VideoPlayer url='https://www.youtube.com/watch?v=5qap5aO4i9A' />
                <Grid container item xs={12}>
                    <Typography variant='subtitle2'>Question Feed</Typography>
                    <QuestionFeed />
                </Grid>
            </Grid>
        </Paper>
    );
}

const useDesktopStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        [theme.breakpoints.up('md')]: {
            flexFlow: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
        },
    },
    paper: {
        [theme.breakpoints.up('md')]: {
            overflowY: 'scroll',
            maxHeight: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '100%',
        },
        padding: theme.spacing(3),
        width: '100%',
    },
    video: {
        // paddingRight: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            flexGrow: 2,
            maxHeight: `calc((9/16) * 66vw - ${theme.spacing(2)}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: '33vh',
            height: '33vh',
            width: '100%',
        },
    },
    feedContainer: {
        height: '100%',
        // [theme.breakpoints.up('md')]: {
        //     flexGrow: 1,
        //     height: '100%',
        //     paddingLeft: theme.spacing(1),
        // },
        // [theme.breakpoints.down('sm')]: {
        //     flexGrow: 1,
        // },
    },
    // saving these for future
    // sticky: {
    //     top: 0,
    //     zIndex: theme.zIndex.appBar,
    //     position: 'sticky',
    //     width: '100%',
    // },
}));

function DesktopLive() {
    const { form } = React.useContext(TownhallContext);
    const classes = useDesktopStyles();

    return (
        <div className={classes.root}>
            <Grid item xs='auto' className={classes.video}>
                {/* <Grid container> */}
                {/* <div className={classes.sticky}> */}
                <VideoPlayer url='https://www.youtube.com/watch?v=5qap5aO4i9A' />
                {/* </div> */}
                {/* </Grid> */}
            </Grid>
            <Grid
                container
                item
                xs={12}
                md={4}
                className={classes.feedContainer}
            >
                <Paper className={classes.paper}>
                    <Typography variant='subtitle2'>Question Feed</Typography>
                    <QuestionFeed />
                </Paper>
            </Grid>
        </div>
    );
}

export default function TownhallLive() {
    const device = React.useContext(DeviceContext);

    switch (device) {
        // case 'desktop':
        //     return <DesktopLive />;
        // case 'mobile':
        //     return <MobileLive />;
        default:
            return <DesktopLive />;
    }
}
