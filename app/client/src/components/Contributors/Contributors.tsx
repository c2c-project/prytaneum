// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import { makeStyles, createStyles, Theme } from '@mui/material/styles';

// import { Team } from 'prytaneum-typings';

// interface Props {
//     team: Team;
//     maxDisplayCount: number;
// }

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         large: {
//             width: theme.spacing(7),
//             height: theme.spacing(7),
//         },
//     })
// );
// export default function Contributors({ team, maxDisplayCount }: Props) {
//     const classes = useStyles();
//     return (
//         <Grid container spacing={5}>
//             <Grid
//                 container
//                 item
//                 justify='center'
//                 alignItems='center'
//                 spacing={3}
//             >
//                 {team.members.slice(0, maxDisplayCount).map((member, index) => (
//                     <Grid item xs={6} sm={2} key={index}>
//                         <Grid
//                             container
//                             direction='column'
//                             alignItems='center'
//                             justify='center'
//                         >
//                             <Grid item>
//                                 <Avatar
//                                     className={classes.large}
//                                     key={index}
//                                     alt={member.fullName}
//                                     src={member.picturePath}
//                                 />
//                             </Grid>
//                             <Grid item>
//                                 <Typography
//                                     align='center'
//                                     color='textSecondary'
//                                     variant='caption'
//                                 >
//                                     {member.fullName}
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Grid container item justify='center'>
//                 {/* TODO: When clicked redirect to a page that displays the entire team using the Team component  */}
//                 <Link href='www.todo.add.href'>
//                     {`+ ${Math.max(
//                         team.members.length - maxDisplayCount,
//                         0
//                     )} Contributors`}
//                 </Link>
//             </Grid>
//         </Grid>
//     );
// }

export {}
