import React from 'react';
import faker from 'faker';

import ChatMessage from './ChatMessage';

export default {
    title: 'Components/Chat Message',
    component: ChatMessage,
};

export function Basic() {
    return (
        <ChatMessage name={faker.internet.userName()} timestamp={faker.date.recent()} message={faker.lorem.text()} />
    );
}
