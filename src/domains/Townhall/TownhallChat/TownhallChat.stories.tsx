import React from 'react';
import { Grid } from '@material-ui/core';
import { EventEmitter } from 'events';
import { makeChatMessage } from 'prytaneum-typings';

import Main from 'layout/Main';
import TownhallProvider from 'contexts/Townhall';
import FixtureSocket from 'mock/Fixture.socket';
import Component from './TownhallChat';

export default { title: 'Domains/Townhall/Townhall Chat' };

function sendMessages(num: number, emitter: SocketIOClient.Socket) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('chat-message-state', {
            type: 'create-chat-message',
            payload: makeChatMessage(),
        });
    }
}

export function Basic() {
    const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

    return (
        <Main>
            <TownhallProvider townhallId='123'>
                <Grid
                    item
                    xs={12}
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignContent: 'flex-start',
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <button
                            type='button'
                            onClick={() => sendMessages(1, emitter)}
                        >
                            Add Messages
                        </button>
                    </div>
                    {/* flex will recalculate height, but height: 0 is necessary so that the paper does not infinitely grow */}
                    <div style={{ flex: '1 1 100%', height: 0 }}>
                        <FixtureSocket.Provider value={emitter}>
                            <Component />
                        </FixtureSocket.Provider>
                    </div>
                </Grid>
            </TownhallProvider>
        </Main>
    );
}
