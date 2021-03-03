import React from 'react';
import { MenuItem } from '@material-ui/core';
import type { Breakout } from 'prytaneum-typings';
import { useDispatch } from 'react-redux';

import Loader from 'components/Loader';
import TextField from 'components/TextField';
import useEndpoint from 'hooks/useEndpoint';
import { breakoutRoomChange } from 'reducers';
import { changeBreakoutRoom, getBreakoutRooms } from '../api';

export default function BreakoutList({ townhallId, breakoutId }: { townhallId: string; breakoutId: string }) {
    const [[prevRoom, currentRoom], setRoom] = React.useState<[string, string]>([breakoutId, breakoutId]);
    const [rooms, setRooms] = React.useState<Breakout[]>([]);
    const dispatch = useDispatch();
    const listEndpoint = React.useCallback(() => getBreakoutRooms(townhallId), [townhallId]);
    const changeEndpoint = React.useCallback(() => changeBreakoutRoom(townhallId, prevRoom, currentRoom), [
        townhallId,
        prevRoom,
        currentRoom,
    ]);

    const [, isLoading] = useEndpoint(listEndpoint, {
        onSuccess: ({ data }) => {
            setRooms(data);
        },
        minWaitTime: 0,
        runOnFirstRender: true,
    });

    const [run, isLoading2] = useEndpoint(changeEndpoint, {
        minWaitTime: 0,
        onSuccess: () => {
            dispatch(breakoutRoomChange({ breakoutId: currentRoom }));
        },
    });

    // I only want this to run whenever the current room changes
    React.useEffect(() => {
        if (prevRoom !== currentRoom) run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRoom, prevRoom]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newBreakoutId = event.target.value as string;
        setRoom((prev) => [prev[1], newBreakoutId]);
    };

    if (isLoading || isLoading2 || rooms.length === 0) return <Loader />;

    return (
        <TextField select label='Breakout Room' value={currentRoom} onChange={handleChange}>
            {rooms.map(({ _id }, idx) => (
                <MenuItem key={_id} value={_id}>{`Room #${idx + 1}`}</MenuItem>
            ))}
        </TextField>
    );
}
