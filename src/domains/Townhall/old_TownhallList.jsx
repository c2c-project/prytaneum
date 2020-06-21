// /* eslint-disable react/jsx-curly-newline */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core/styles';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import SessionList from '../../components/SessionList';
// import Fab from '../../components/Fab';
// import Dialog from '../../components/Dialog';
// import DateTimePicker from '../../components/DateTimePicker';
// import PageContainer from '../../layout/PageContainer';
// import GateKeep from '../../components/GateKeep';
// import useSnack from '../../hooks/useSnack';
// import useJwt from '../../hooks/useJwt';


// const useStyles = makeStyles(theme => ({
//     dialogForm: {
//         paddingTop: theme.spacing(3)
//     }
// }));

// export default function Sessions() {
//     const classes = useStyles();
//     const history = useHistory();
//     const [snack] = useSnack();
//     const [data, setData] = React.useState([]);
//     const [isFormOpen, setFormOpen] = React.useState(false);
//     const [formType, setFormType] = React.useState('create');
//     const [force, refetch] = React.useReducer(x => x + 1, 0);
//     const [anchorEl, setAnchor] = React.useState(null);
//     const [target, setTarget] = React.useState(null);
//     const [jwt] = useJwt();
//     React.useEffect(() => {
//         fetch('/api/sessions/find', {
//             headers: {
//                 Authorization: `bearer ${jwt}`
//             }
//         }).then(res => {
//             res.json().then(r => setData(r));
//         });
//     }, [force, jwt]);

//     // this is the card vert menu in the card actions
//     const handleSessionOptionsClick = (e, sessionId) => {
//         e.preventDefault();
//         setAnchor(e.currentTarget);
//         // any menu action now has 'this' session as the target for any subsequent operations
//         setTarget(sessionId);
//     };
//     const handleSessionOptionsClose = () => {
//         setAnchor(null);
//         setTarget(null);
//     };

//     // edit & delete are options inside the card actions
//     const handleEdit = () => {
//         // close the popout menu
//         setAnchor(null);
//         // set the form type
//         setFormType('update');
//         // open the form
//         setFormOpen(true);
//     };
//     const handleDelete = () => {
//         fetch('/api/sessions/delete', {
//             method: 'POST',
//             body: JSON.stringify({ sessionId: target }),
//             headers: {
//                 Authorization: `bearer ${jwt}`,
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(() => {
//                 handleSessionOptionsClose();
//                 refetch();
//                 snack('Successfully deleted the session!', 'success');
//             })
//             .catch(() => {
//                 snack('Error deleting, please try again.', 'error');
//             });
//     };

//     const goToSession = sessionId => {
//         // TODO: change this when I change how I get the session data
//         // localStorage.setItem(
//         //     'session',
//         //     JSON.stringify(data.find(session => sessionId === session._id))
//         // );
//         history.push(`/app/sessions/${sessionId}/live`);
//     };
//     // TODO: generate menu options based on user role
//     // TODO: add ics download option w/ icon, probably inside the session component
//     return (
//         <PageContainer>
//             <Container maxWidth='lg'>
//                 <Dialog open={isFormOpen} onClose={() => setFormOpen(false)}>
//                     <Container maxWidth='lg' className={classes.dialogForm}>
//                         <SessionForm
//                             type={formType}
//                             onSubmit={() => {
//                                 setFormOpen(false);
//                                 refetch();
//                                 snack(
//                                     formType === 'update'
//                                         ? 'Successfully updated the session!'
//                                         : 'Successfully created a new session!',
//                                     'success'
//                                 );
//                             }}
//                             editTarget={target}
//                         />
//                     </Container>
//                 </Dialog>
//                 <SessionList
//                     sessions={data}
//                     onClickOptions={handleSessionOptionsClick}
//                     onClickGoToSession={goToSession}
//                 />
//                 <GateKeep
//                     local
//                     permissions={{ requiredAny: ['moderator', 'admin'] }}
//                 >
//                     <Fab
//                         onClick={() => {
//                             setFormOpen(true);
//                             setFormType('create');
//                         }}
//                     />
//                 </GateKeep>
//                 <Menu
//                     id='session-options'
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={Boolean(anchorEl)}
//                     onClose={handleSessionOptionsClose}
//                 >
//                     <MenuItem onClick={handleEdit}>Edit</MenuItem>
//                     <MenuItem onClick={handleDelete}>Delete</MenuItem>
//                     {/* <MenuItem onClick={handleSessionOptionsClose}>Logout</MenuItem> */}
//                 </Menu>
//             </Container>
//         </PageContainer>
//     );
// }
