import React from 'react';
import { MenuItem } from '@material-ui/core';
import type { Breakout } from 'prytaneum-typings';

import Loader from 'components/Loader';
import TextField from 'components/TextField';
import useEndpoint from 'hooks/useEndpoint';
import { changeBreakoutRoom, getBreakoutRooms } from '../api';

export default function BreakoutList({ townhallId, breakoutId }: { townhallId: string; breakoutId: string }) {
    const [room, setRoom] = React.useState<string>(breakoutId);
    const [rooms, setRooms] = React.useState<Breakout[]>([]);
    const listEndpoint = React.useCallback(() => getBreakoutRooms(townhallId), [townhallId]);
    const changeEndpoint = React.useCallback(() => changeBreakoutRoom(townhallId, breakoutId, room), [
        townhallId,
        breakoutId,
        room,
    ]);

    const [, isLoading] = useEndpoint(listEndpoint, {
        onSuccess: ({ data }) => {
            setRooms(data);
            if (data[0]) setRoom(data[0]._id);
        },
        minWaitTime: 0,
        runOnFirstRender: true,
    });

    const [run] = useEndpoint(changeEndpoint, {
        minWaitTime: 0,
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        run();
        setRoom(event.target.value as string);
    };

    if (isLoading) return <Loader />;

    return (
        <TextField select label='Breakout Room' value={room} onChange={handleChange}>
            {rooms.map(({ _id }, idx) => (
                <MenuItem key={_id} value={_id}>{`Room #${idx + 1}`}</MenuItem>
            ))}
        </TextField>
    );
}
