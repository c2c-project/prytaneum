// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Slide from '@material-ui/core/Slide';
// import Hidden from '@material-ui/core/Hidden';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Loader from '../../../components/Loader';
// import ChatWindow from '../../../components/Chat';
// import QuestionWindow from '../components/question';
// import VideoPlayer from '../components/video-player';
// import CurrentQuestion from '../../../components/CurrentQuestion';
// import Dialog from '../../../components/Dialog';
// import FormQuestion from '../../../components/FormQuestion';
// import Tabs from '../../../components/Tabs';
// import GateKeep from '../../../components/GateKeep';
// import UserListWindow from '../components/userList';
// import useJwt from '../../../hooks/useJwt';
// // import Speaker from '../components/Speaker';
// // import ModDashboard from '../components/ModDashboard';



// const useStyles = makeStyles((theme) => ({
//     root: {
//         height: '100%',
//         flex: 1,
//     },
//     video: {
//         [theme.breakpoints.down('sm')]: {
//             maxHeight: '30vh',
//         },
//         alignSelf: 'center',
//         [theme.breakpoints.down('md')]: {
//             maxWidth: '100vw',
//         },
//         // flexBasis: 'auto',
//         // flexGrow: 0
//     },
//     chat: {
//         [theme.breakpoints.down('md')]: {
//             maxWidth: '100vw',
//         },
//         // [theme.breakpoints.up('md')]: {
//         //     height: '100%'
//         // },
//         // [theme.breakpoints.down('sm')]: {
//         //     height: '50vh'
//         // }
//         flexBasis: '100%',
//         flexGrow: 1,
//         // border: '1px solid #80808029'
//         // minHeight: '50vh'
//     },
//     modView: {
//         padding: theme.spacing(2),
//         width: '100%',
//         height: '100%',
//         // display: 'flex',
//         // flex: 1
//     },
// }));

// export default function Chat() {
//     const classes = useStyles();
//     const { roomId } = useParams();
//     const [sessionData, setSessionData] = React.useState(false);
//     const [jwt] = useJwt();
//     React.useEffect(() => {
//         fetch(`/api/sessions/find/${roomId}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `bearer ${jwt}`,
//             },
//         })
//             .then((res) => {
//                 res.json().then((sessionDoc) => {
//                     setSessionData(sessionDoc);
//                 });
//             })
//             .catch((e) => console.log(e));
//     }, [jwt, roomId]);

//     // const sessionData = JSON.parse(localStorage.getItem('session'));
//     const modView = sessionData && (
//         <Tabs
//             pages={[
//                 {
//                     label: 'User View',
//                     component: (
//                         <Grid
//                             container
//                             className={classes.root}
//                             justify='flex-end'
//                         >
//                             {/* <Slide in direction='right' timeout={300}> */}
//                             <Grid
//                                 container
//                                 item
//                                 xs={12}
//                                 md={6}
//                                 className={classes.height}
//                                 justify='center'
//                             >
//                                 <Grid
//                                     item
//                                     xs={12}
//                                     md={10}
//                                     className={classes.video}
//                                 >
//                                     <Video
//                                         roomId={roomId}
//                                         url={sessionData.url}
//                                     />
//                                 </Grid>
//                             </Grid>
//                             {/* </Slide> */}
//                             {/* <Slide in direction='left' timeout={300}> */}
//                             <Grid item xs={12} md={6} className={classes.chat}>
//                                 <ChatWindow
//                                     roomId={roomId}
//                                     title='Discussion'
//                                 />
//                             </Grid>
//                             {/* </Slide> */}
//                         </Grid>
//                     ),
//                 },
//                 {
//                     label: 'Question Window',
//                     component: (
//                         <Grid container className={classes.modView}>
//                             <Grid item xs={12}>
//                                 <QuestionWindow
//                                     roomId={roomId}
//                                     title='Incoming Questions'
//                                 />
//                                 {/* <Chat roomId={roomId} /> */}
//                                 {/* <ModDashboard data={data} /> */}
//                             </Grid>
//                         </Grid>
//                     ),
//                 },
//                 {
//                     label: 'User List Window',
//                     component: (
//                         <Grid container className={classes.modView}>
//                             <Grid item xs={12}>
//                                 <UserListWindow
//                                     roomId={roomId}
//                                     title='User List'
//                                 />
//                                 {/* <Chat roomId={roomId} /> */}
//                                 {/* <ModDashboard data={data} /> */}
//                             </Grid>
//                         </Grid>
//                     ),
//                 },
//             ]}
//         />
//     );
//     const userView = sessionData && (
//         <Grid container className={classes.root} justify='flex-end'>
//             <Slide in direction='right' timeout={300}>
//                 <Grid container item xs={12} md={6} justify='center'>
//                     <Grid item xs={12} md={10} className={classes.video}>
//                         <Video roomId={roomId} url={sessionData.url} />
//                     </Grid>
//                 </Grid>
//             </Slide>
//             <Slide in direction='left' timeout={300}>
//                 <Grid item xs={12} md={6} className={classes.chat}>
//                     <ChatWindow title='Discussion' roomId={roomId} />
//                 </Grid>
//             </Slide>
//         </Grid>
//     );

//     const speakerView = sessionData && (
//         <GateKeep
//             local
//             permissions={{ requiredAny: ['speaker'] }}
//             elseRender={userView}
//         >
//             <Grid container className={classes.root}>
//                 <Grid item xs={12}>
//                     <Grid container className={classes.root} justify='center'>
//                         <Slide in direction='right' timeout={300}>
//                             <Grid
//                                 container
//                                 item
//                                 xs={12}
//                                 md={6}
//                                 className={classes.height}
//                                 justify='center'
//                             >
//                                 <Grid
//                                     item
//                                     xs={12}
//                                     md={10}
//                                     className={classes.video}
//                                 >
//                                     <Video
//                                         roomId={roomId}
//                                         url={sessionData.url}
//                                         disableQuestion
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Slide>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </GateKeep>
//     );
//     return sessionData ? (
//         <GateKeep
//             local
//             permissions={{ requiredAny: ['moderator', 'admin'] }}
//             elseRender={speakerView}
//         >
//             {modView}
//         </GateKeep>
//     ) : (
//         <Loader />
//     );
// }