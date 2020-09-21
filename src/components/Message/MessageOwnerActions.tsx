import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Bold from '../Bold';
// import useJwt from 'hooks/useJwt';
import useSnack from '../../hooks/useSnack';
import { Message } from './types';

const useStyles = makeStyles((theme) => ({
    Message: {
        width: 330,
    },
    UserName: {
        margin: theme.spacing(2),
    },
    DangerButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}));

interface Props {
    targetMessage: Message;
    onClick: () => void;
}

interface Params {
    roomId: string;
}

export default function MessageOwnerActions({ targetMessage, onClick }: Props) {
    const classes = useStyles();
    const [message, setMessage] = React.useState(targetMessage.message);
    const jwt = ''; // TODO:
    // const [jwt] = useJwt();
    const [snack] = useSnack();
    // FIXME:
    const roomId = '';

    const handleEdit = async (e: React.MouseEvent<{ value: unknown }>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/chat/update-message/', {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newMessage: message,
                    message: targetMessage,
                    roomId,
                }),
            });
            if (response.status === 200) {
                snack('Message edited successfully', 'success');
                onClick();
            } else {
                snack('Something went wrong! Try again.', 'error');
            }
        } catch {
            snack('Something went wrong! Try again.', 'error');
        }
    };

    // Change the delete message to just hide it. ie mark it as deleted
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/chat/delete-message/${roomId}`, {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: targetMessage,
                }),
            });
            if (response.status === 200) {
                snack('Successfully deleted message', 'success');
                onClick();
            } else {
                snack('Something went wrong! Try again.', 'error');
            }
        } catch {
            snack('Something went wrong! Try again.', 'error');
        }
    };

    return (
        <Grid container justify='center' spacing={3}>
            <Grid item xs={12}>
                <Grid container justify='center'>
                    <Grid item xs='auto' className={classes.UserName}>
                        <Bold>{`${targetMessage.username}:`}</Bold>
                    </Grid>
                    <Grid item xs='auto' className={classes.Message}>
                        <form>
                            <TextField
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                fullWidth
                                color='secondary'
                                variant='outlined'
                            />
                        </form>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color='secondary'
                    variant='contained' // TODO: fix this, should be inside the form tag
                    fullWidth
                    onClick={handleEdit}
                >
                    Submit Change
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleDelete}
                    className={classes.DangerButton}
                >
                    Delete
                </Button>
            </Grid>
        </Grid>
    );
}

MessageOwnerActions.defaultProps = {
    onClick: () => {},
};

MessageOwnerActions.propTypes = {
    targetMessage: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
};
