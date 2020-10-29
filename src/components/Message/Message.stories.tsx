import React from 'react';
import faker from 'faker';

import Message from './Message';

export default {
    title: 'Components/Message',
    component: Message,
};

export function Basic() {
    return (
        <Message
            name={faker.internet.userName()}
            timestamp={faker.date.recent()}
            message={faker.lorem.text()}
        />
    );
}
