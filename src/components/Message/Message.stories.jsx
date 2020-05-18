/* eslint-disable no-multi-str */
import React from 'react';
import Message from './Message';

export default { title: 'Messages' };

const mockMessages = [
    {
        _id: '1',
        userId: '1',
        username: 'cookies',
        message: 'i like cookies',
        sent: Date.now(),
        moderated: false,
    },
    {
        _id: '2',
        userId: '2',
        username: 'cake',
        message: 'cake is better',
        sent: Date.now(),
        moderated: false,
    },
    {
        _id: '3',
        userId: '3',
        username: 'muffins',
        sent: Date.now(),
        message:
            'muffins or nuffin, A never ending message that just keeps going and going and going and\
             going and going and going and going and going and going and goingand going and going and\
              goingand going and going and goingand going and going and goingand going and going and\
               goingand going and going and going',
        moderated: false,
    },
];

export function GenericMessages() {
    return (
        <div style={{ height: '500px' }}>
            <Message
                messages={mockMessages}
                onClickMessage={(id) =>
                    console.log(`I, ${id}, have been clicked!`)
                }
            />
        </div>
    );
}
