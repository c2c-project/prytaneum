// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Divider, AppBar, Tabs, Tab, Grid } from '@material-ui/core';
// import { Route, Link } from 'react-router-dom';

// import Paper from 'components/Paper';
// import VideoPlayer from 'components/VideoPlayer';
// import { DeviceContext } from 'contexts/Device';
// import { TownhallContext } from '../Contexts/Townhall';
// import MyQuestions from '../MyQuestions';

// function TownhallLiveTabs({ url }: { url: string }) {
//     return (
//         <div>
//             <AppBar position='static' color='transparent' elevation={0}>
//                 <Tabs value={tab} variant='fullWidth'>
//                     <Tab
//                         value='my-questions'
//                         label='My Questions'
//                         component={Link}
//                         to={`${url}/my-questions`}
//                     />
//                     <Tab
//                         value='all-questions'
//                         label='All Questions'
//                         component={Link}
//                         to={`${url}/all-questions`}
//                     />
//                 </Tabs>
//                 <Divider />
//             </AppBar>
//             <div style={{ overflowX: 'hidden' }}>
//                 <Switch>
//                     <Route path={`${url}/my-questions`}>
//                         <MyQuestions />
//                     </Route>
//                     <Route path={`${url}/all-questions`}>
//                         <h1>TODO: all questions feed</h1>
//                     </Route>
//                 </Switch>
//             </div>
//         </div>
//     );
// }

// function TabRouter() {
//     const { path, url } = useRouteMatch();
//     return (
//         <Switch>
//             <Route path={`${url}/:tab`}>
//                 <TownhallLiveTabs url={url} />
//             </Route>
//             <Route path={path} exact>
//                 <Redirect to={`${path}/my-questions`} />
//             </Route>
//         </Switch>
//     );
// }

// const useMobileStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         height: '100%',
//     },
//     bottom: {
//         paddingBottom: theme.spacing(3),
//     },
//     // button: {
//     //     padding: `0px ${theme.spacing(1)}px 0px ${theme.spacing(1)}px`,
//     // },
//     paper: {
//         paddingBottom: theme.spacing(1),
//         borderRadius: '0px',
//         height: '100%',
//     },
// }));

// function MobileLive() {
//     const townhall = React.useContext(TownhallContext);
//     const classes = useMobileStyles();

//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 <Grid container spacing={0}>
//                     <Grid item xs={12}>
//                         <VideoPlayer url={townhall.url} />
//                     </Grid>
//                     <Grid item xs={12} className={classes.bottom}>
//                         <TabRouter />
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </div>
//     );
// }

// const useDesktopStyles = makeStyles((theme) => ({
//     paper: {
//         borderRadius: theme.custom.borderRadius,
//         padding: theme.spacing(3),
//     },
// }));

// function DesktopLive() {
//     const townhall = React.useContext(TownhallContext);
//     const classes = useDesktopStyles();

//     return (
//         <Paper className={classes.paper}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <VideoPlayer url={townhall.url} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TabRouter />
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// }

// export default function TownhallLive() {
//     const device = React.useContext(DeviceContext);

//     switch (device) {
//         case 'desktop':
//             return <DesktopLive />;
//         case 'mobile':
//             return <MobileLive />;
//         default:
//             return <DesktopLive />;
//     }
// }

export default {};
