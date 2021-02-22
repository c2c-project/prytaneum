/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeQuestion, makeGenFn, makeUser } from 'prytaneum-typings';

import SocketFixture from 'mock/Fixture.socket';
import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import QuestionQueue from './QuestionQueue';
import QueuePreview, { Props as PreviewProps } from './QueuePreview';

const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('playlist-state', {
            type: 'playlist-add',
            payload: makeQuestion(),
        });
    }
}

function sendQueue(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('playlist-state', {
            type: 'playlist-queue-add',
            payload: makeQuestion(),
        });
    }
}

export default {
    title: 'Domains/Questions/Question Queue',
    decorators: [
        (MyStory) => (
            <div style={{ maxWidth: 500, width: '100%', height: '100%' }}>
                <UserProvider value={makeUser()} forceNoLogin>
                    <TownhallProvider townhallId='123'>
                        <SocketFixture.Provider value={emitter}>
                            <MyStory />
                        </SocketFixture.Provider>
                    </TownhallProvider>
                </UserProvider>
            </div>
        ),
    ],
} as Meta;

export function FullExample() {
    return (
        <>
            <div style={{ paddingBottom: '8px' }}>
                <button onClick={() => sendMessage(5)} type='button'>
                    Add questions to suggested
                </button>
                <button type='button' onClick={() => sendQueue(5)}>
                    Add questions to queue
                </button>
            </div>
            <QuestionQueue />
        </>
    );
}

const questions = makeGenFn(makeQuestion)(15);

export const Preview: Story<PreviewProps> = (props) => <QueuePreview {...props} />;
Preview.argTypes = {
    onClickNext: {
        action: 'next question',
    },
    onClickPrev: {
        action: 'previous question',
    },
    onClickReorder: {
        action: 'reorder',
    },
};
Preview.args = {
    queue: questions,
    current: 0,
};
Preview.parameters = {
    layout: 'none',
};

export const EmptyPreview = Preview.bind({});
EmptyPreview.argTypes = {
    onClickNext: {
        action: 'next question',
    },
    onClickPrev: {
        action: 'previous question',
    },
};
EmptyPreview.args = {
    queue: questions,
    current: -1,
};
EmptyPreview.parameters = {
    layout: 'none',
};
