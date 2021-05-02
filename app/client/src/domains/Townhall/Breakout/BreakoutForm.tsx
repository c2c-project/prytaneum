import React from 'react';
import { Button, Typography } from '@material-ui/core';

import Form from 'components/Form';
import FormContent from 'components/FormContent';
import FormActions from 'components/FormActions';
import TextField from 'components/TextField';
import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import useTownhall from 'hooks/useTownhall';
import { getAttendees } from '../api';

interface Props {
    onSubmit: (numRooms: number) => void;
    onCancel?: () => void;
}

export default function BreakoutForm({ onSubmit, onCancel }: Props) {
    const [value, setValue] = React.useState(1);
    const [townhall] = useTownhall();
    const [attendees, setAttendees] = React.useState(0);
    const endpoint = React.useCallback(() => getAttendees(townhall._id), [townhall._id]);
    const [, isLoading] = useEndpoint(endpoint, {
        minWaitTime: 0,
        onSuccess: ({ data }) => {
            setAttendees(data.attendees);
        },
        runOnFirstRender: true,
    });

    if (isLoading) return <Loader />;

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(value);
            }}
        >
            <FormContent>
                <Typography align='center'>
                    <b>{Math.round(attendees / value)}</b>
                    &nbsp; People per room
                </Typography>
                <TextField
                    label='Number of Rooms'
                    inputProps={{ min: 1, max: Math.floor(attendees / 2), type: 'number' }}
                    value={value}
                    onChange={(e) => {
                        const { value: num } = e.target;
                        setValue(parseInt(num, 10));
                    }}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justify: 'flex-end' }}>
                {onCancel && <Button onClick={onCancel}>Cancel</Button>}
                <Button variant='contained' color='primary' type='submit'>
                    Submit
                </Button>
            </FormActions>
        </Form>
    );
}

BreakoutForm.defaultProps = {
    onCancel: undefined,
};
