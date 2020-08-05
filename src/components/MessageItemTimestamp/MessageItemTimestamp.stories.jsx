import React from 'react';

import MessageItemTimestamp from '.';

export default { title: 'Components/MessageItemTimestamp' };

const time = 10

export function MessageItemTimestampDisplay() {
    return (
        <div>
            <MessageItemTimestamp time={time} />
            <p>the time=10 should be 04:00</p>
        </div>
    );
}