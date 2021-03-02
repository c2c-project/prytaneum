import React from 'react';
import { Paper, Typography, Grid, Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import type { SocketIOEvents } from 'prytaneum-typings';
import axios from 'axios';

import ResponsiveDialog from 'components/ResponsiveDialog';
import LoadingButton from 'components/LoadingButton';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import useUser from 'hooks/useUser';
import useSocketio, { SocketFn } from 'hooks/useSocketio';
import { breakoutStart, breakoutEnd, addChatMessage, updateChatMessage, deleteChatMessage } from 'reducers';
import BreakoutForm from './BreakoutForm';
import BreakoutRoom from './BreakoutRoom';
import { getMyBreakoutRoom, startBreakout } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 300,
        padding: theme.spacing(2),
    },
    primary: {
        flexGrow: 1,
    },
}));

function StartBreakoutButton({ townhallId }: { townhallId: string }) {
    const numRoomsRef = React.useRef(0);
    const endpoint = React.useCallback(() => startBreakout(townhallId, numRoomsRef.current), [townhallId]);
    const [run, isLoading] = useEndpoint(endpoint, { onSuccess: () => {} });
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <LoadingButton loading={isLoading}>
                <Button fullWidth variant='outlined' onClick={() => setOpen(true)}>
                    Start Breakout
                </Button>
            </LoadingButton>
            <ResponsiveDialog open={open} onClose={() => setOpen(false)} title='Breakout Form'>
                <DialogContent>
                    <BreakoutForm
                        onSubmit={(rooms) => {
                            numRoomsRef.current = rooms;
                            setOpen(false);
                            run();
                        }}
                        onCancel={() => setOpen(false)}
                    />
                </DialogContent>
            </ResponsiveDialog>
        </>
    );
}

export default function Breakout() {
    const classes = useStyles();
    const [user] = useUser();
    const hasRunRef = React.useRef(false);
    const { isActive, breakoutId } = useSelector((store) => store.chat);
    const dispatch = useDispatch();
    const [{ _id: townhallId }, isModerator] = useTownhall();
    const endpoint = React.useCallback(() => getMyBreakoutRoom(townhallId), [townhallId]);

    // const endBreakoutEndpiont = React.useCallback(() => endBreakout(townhallId), [townhallId]);

    const [run] = useEndpoint(endpoint, {
        onSuccess: ({ data }) => {
            if (data.breakoutId) dispatch(breakoutStart({ breakoutId: data.breakoutId }));

            // this case should pretty much never happen
            if (!data.breakoutId && isActive) dispatch(breakoutEnd());
        },
        onFailure: (err) => {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 404) {
                    dispatch(breakoutEnd());
                }
            }
        },
        minWaitTime: 0,
        runOnFirstRender: true,
    });

    React.useEffect(() => {
        if (isActive && !breakoutId && hasRunRef.current === false) {
            hasRunRef.current = true;
            run();
        }
        if (!isActive && hasRunRef.current === true) hasRunRef.current = false;
    }, [isActive, breakoutId, run]);

    const socketFn: SocketFn = React.useCallback(
        (socket) => {
            socket.on('chat-message-state', (action: SocketIOEvents['chat-message-state']) => {
                switch (action.type) {
                    case 'create-chat-message':
                        dispatch(addChatMessage(action.payload));
                        break;
                    case 'update-chat-message':
                        dispatch(updateChatMessage(action.payload));
                        break;
                    case 'delete-chat-message':
                        dispatch(deleteChatMessage(action.payload._id));
                        break;
                    case 'moderate-chat-message':
                        dispatch(deleteChatMessage(action.payload._id));
                        break;
                    case 'breakout-start':
                        dispatch(breakoutStart({ breakoutId: action.payload.breakoutId }));
                        break;
                    case 'breakout-end':
                        dispatch(breakoutEnd());
                        break;
                    default:
                    // do nothing
                }
            });
        },
        [dispatch]
    );

    useSocketio('/breakout-rooms', { query: { townhallId } }, socketFn);

    if (!isActive || !breakoutId || !user)
        return (
            <Grid component={Paper} container className={classes.root} direction='column' wrap='nowrap'>
                <Grid container item xs={12} justify='center' alignItems='center' className={classes.primary}>
                    {!isActive && (
                        <Grid item component={Typography} variant='body2' color='textSecondary'>
                            {!user && isActive
                                ? 'You must be signed in to participate'
                                : 'Breakout Rooms are currently inactive'}
                        </Grid>
                    )}
                </Grid>
                {isModerator && (
                    <Grid container item justify='flex-end'>
                        <StartBreakoutButton townhallId={townhallId} />
                    </Grid>
                )}
            </Grid>
        );
    return <BreakoutRoom breakoutId={breakoutId} />;
}
