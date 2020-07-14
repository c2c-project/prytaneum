import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMessages from '../../hooks/useMessages';
import Message from '../Message';
import Chatbar from './Chatbar';
import useJwt from '../../hooks/useJwt';

// TODO: test comment to see if this works
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flex: 1,
        height: '100%',
    },
    divider: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
    },
    chatbar: {
        flexBasis: 0,
    },
    messages: {
        flexBasis: 0,
        overflowY: 'scroll',
        flexGrow: 1,
    },
}));

function Chat({ roomId, title, onMessageSend, children }) {
    // const [messages, sendMsg] = useMessages(roomId);
    // const [jwt] = useJwt();
    // const [isModerator, setModerator] = React.useState(false);
    // const [filter, setFilter] = React.useState({
    //     moderated: true,
    //     normal: true,
    // });
    const classes = useStyles();
    // const filterTable = () => {
    //     if (isModerator) {
    //         return (
    //             <FormGroup row>
    //                 <FormControlLabel
    //                     control={
    //                         <Checkbox
    //                             checked={filter.normal}
    //                             onChange={() =>
    //                                 setFilter({
    //                                     ...filter,
    //                                     normal: !filter.normal,
    //                                 })
    //                             }
    //                             name='normal'
    //                             color='primary'
    //                         />
    //                     }
    //                     label='Normal'
    //                 />
    //                 <FormControlLabel
    //                     control={
    //                         <Checkbox
    //                             checked={filter.moderated}
    //                             onChange={() =>
    //                                 setFilter({
    //                                     ...filter,
    //                                     moderated: !filter.moderated,
    //                                 })
    //                             }
    //                             name='moderated'
    //                             color='primary'
    //                         />
    //                     }
    //                     label='Moderated'
    //                 />
    //             </FormGroup>
    //         );
    //     }
    // };
    // React.useEffect(() => {
    //     let isMounted = true;
    //     fetch('/api/users/authenticate', {
    //         method: 'POST',
    //         body: JSON.stringify({ requiredAny: ['moderator', 'admin'] }),
    //         headers: {
    //             Authorization: `bearer ${jwt}`,
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((r) => {
    //         r.json().then((result) => {
    //             if (isMounted) {
    //                 setModerator(result.allowed);
    //             }
    //         });
    //     });
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [jwt]);
    return (
        <Paper className={classes.paper}>
            <Grid container direction='column' spacing={2}>
                {/* <Grid item xs='auto'>
                    <FormGroup row>
                        <Typography variant='h4'>{title}</Typography>
                        {filterTable()}
                    </FormGroup>
                </Grid> */}
                <Divider className={classes.divider} />
                <Grid item xs={12} className={classes.messages}>
                    {children}
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={12} className={classes.chatbar}>
                    <Chatbar onMessageSend={onMessageSend} />
                </Grid>
            </Grid>
        </Paper>
    );
}

Chat.propTypes = {
    roomId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onMessageSend: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};

export default Chat;
