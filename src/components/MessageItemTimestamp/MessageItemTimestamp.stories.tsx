import React from 'react';
import { format } from 'date-fns';
import MessageItemTimestamp from '.';

export default { title: 'Components/MessageItemTimestamp' };

const time = 10

export function MessageItemTimestampDisplay() {
    return (
        <div>
            <MessageItemTimestamp time={time} />
            <p>the time={time} should be {format(new Date(time), 'hh:mm')}</p>
        </div>
    );
}