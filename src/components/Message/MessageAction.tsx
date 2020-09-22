import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Bold from '../Bold';
import useSnack from '../../hooks/useSnack';
import { Message } from './types';

interface Props {
    targetMsg: Message;
    onClick: () => void;
}

interface Params {
    roomId: string;
}

export default function MessageActions({ targetMsg, onClick }: Props) {
    const jwt = '';
    // const [jwt] = useJwt(); // TODO: fix this
    const [snack] = useSnack();
    // const { roomId } = useParams();
    // FIXME:
    const roomId = '';
    const handleAction = () => {
        fetch(`/api/chat/message-action/${roomId}/${targetMsg._id}`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ moderateAction: !targetMsg.moderated }),
        })
            .then((res) => {
                if (res.status === 200) {
                    if (targetMsg.moderated) {
                        snack('Successfully unmoderated messsage', 'success');
                    } else {
                        snack('Successfully moderated messsage', 'success');
                    }
                    onClick();
                } else {
                    snack('Something went wrong! Try again.', 'error');
                }
            })
            .catch(() => {
                snack('Something went wrong! Try again.', 'error');
            });
    };

    // const handleSetCurrent = () => {
    // fetch(`/api/sessions/set-question/:${roomId}`, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `bearer ${jwt}`,
    //         'Content-Type': 'application/json'
    //     }
    // }).then( res => {

    // });
    // };
    return (
        <Grid container justify='center' spacing={3}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid container>
                        <Grid item xs='auto'>
                            <Bold>{`${targetMsg.username}:`}</Bold>
                        </Grid>
                        <Grid item xs='auto'>
                            <Typography color='textPrimary' variant='body1'>
                                {targetMsg.message}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button
                    color='secondary'
                    variant='contained'
                    fullWidth
                    onClick={handleAction}
                >
                    {targetMsg.moderated
                        ? 'Cancel-Moderate/Show'
                        : 'Moderate/Hide'}
                </Button>
            </Grid>
        </Grid>
    );
}

MessageActions.defaultProps = {
    onClick: () => {},
};

MessageActions.propTypes = {
    targetMsg: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        moderated: PropTypes.bool.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
};
