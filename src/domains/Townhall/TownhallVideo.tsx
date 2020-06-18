// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';
// import Paper from '@material-ui/core/Paper';
// import Hidden from '@material-ui/core/Hidden';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import VideoPlayer from '../../components/VideoPlayer';
// import Dialog from '../../components/Dialog';

// const useVideoStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         display: 'flex',
//         flex: 1,
//         flexBasis: 'auto',
//     },
//     question: {
//         width: '100%',
//     },
//     btn: {
//         padding: theme.spacing(2),
//     },
//     questionContent: {
//         paddingTop: theme.spacing(8),
//     },
//     title: {
//         paddingBottom: theme.spacing(3),
//     },
// }));

// export default function Video({ roomId, url, disableQuestion }) {
//     const classes = useVideoStyles();
//     // const [isOpen, setOpen] = React.useState(false);
    
//     // return (
//     //     <Video
//     // )

//     // return (
//     //     <Paper className={classes.paper}>
//     //         <Grid container>
//     //             <Grid container justify='center' item xs={12}>
//     //                 <VideoPlayer url={url} />
//     //             </Grid>
//     //             <Hidden mdDown>
//     //                 <Grid item xs={12} className={classes.question}>
//     //                     <CurrentQuestion roomId={roomId} />
//     //                 </Grid>
//     //             </Hidden>
//     //             <Grid item xs={12}>
//     //                 {!disableQuestion && (
//     //                     <div className={classes.btn}>
//     //                         <Button
//     //                             onClick={() => setOpen(true)}
//     //                             fullWidth
//     //                             variant='contained'
//     //                             color='primary'
//     //                         >
//     //                             Ask a Question
//     //                         </Button>
//     //                     </div>
//     //                 )}
//     //                 <Dialog open={isOpen} onClose={() => setOpen(false)}>
//     //                     <Container
//     //                         maxWidth='md'
//     //                         className={classes.questionContent}
//     //                     >
//     //                         <Typography variant='h4' className={classes.title}>
//     //                             Ask a Question
//     //                         </Typography>
//     //                         <FormQuestion
//     //                             onSubmit={() => setOpen(false)}
//     //                             roomId={roomId}
//     //                         />
//     //                     </Container>
//     //                 </Dialog>
//     //             </Grid>
//     //         </Grid>
//     //     </Paper>
//     // );
// }

export default {};