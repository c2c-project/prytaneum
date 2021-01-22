import React from 'react';
import { Meta } from '@storybook/react';
import { EventEmitter } from 'events';
import { makeQuestion, makeTownhall, makeUser } from 'prytaneum-typings';
import { Grid } from '@material-ui/core';

import Layout from 'layout';
import UserProvider from 'contexts/User';
import FixtureSocket from 'mock/Fixture.socket';
import TownhallProvider from 'contexts/Townhall';
import PaneProvider from '../Contexts/Pane';
import TownhallPanes from './TownhallPanes';

const user = makeUser();
const emitter = (new EventEmitter() as unknown) as SocketIOClient.Socket;

function sendMessage(num?: number) {
    const iterations = num || 1;
    for (let i = 0; i < iterations; i += 1) {
        emitter.emit('question-state', {
            type: 'create-question',
            payload: makeQuestion(),
        });
    }
}

const townhall = makeTownhall();
townhall.settings.chat.enabled = true;
townhall.settings.questionQueue.transparent = true;

export default {
    title: 'Domains/Townhall/Townhall Panes',
    decorators: [
        (Story) => (
            <UserProvider forceNoLogin value={user}>
                <Layout hideSideNav ContainerProps={{ maxWidth: 'xl' }}>
                    <TownhallProvider townhallId='123' value={townhall}>
                        <FixtureSocket.Provider value={emitter}>
                            <PaneProvider>
                                <Story />
                            </PaneProvider>
                        </FixtureSocket.Provider>
                    </TownhallProvider>
                </Layout>
            </UserProvider>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

export function Basic() {
    return (
        <Grid
            container
            direction='column'
            style={{ height: '100%' }}
            alignContent='flex-start'
            wrap='nowrap'
        >
            <div style={{ flex: 1 }}>
                <button type='button' onClick={() => sendMessage(20)}>
                    Add Questions
                </button>
            </div>
            <div
                style={{
                    flex: '1 1 100%',
                    display: 'flex',
                    backgroundColor: 'honeydew',
                    width: '100%',
                }}
            >
                <Grid item xs={12} md={8} />
                <Grid item xs={12} md={4} container style={{ padding: '8px' }}>
                    <TownhallPanes />
                </Grid>
            </div>
        </Grid>
    );
}

export function AsMod() {
    const copy = { ...townhall };
    copy.settings.moderators.list.push({
        email: user.email.address,
        permissions: [],
    });
    return (
        <UserProvider value={user}>
            <Layout hideSideNav ContainerProps={{ maxWidth: 'xl' }}>
                <Grid
                    container
                    direction='column'
                    style={{ height: '100%' }}
                    alignContent='flex-start'
                    wrap='nowrap'
                >
                    <div style={{ flex: 1 }}>
                        <button type='button' onClick={() => sendMessage(20)}>
                            Add Questions
                        </button>
                    </div>
                    <div
                        style={{
                            flex: '1 1 100%',
                            display: 'flex',
                            backgroundColor: 'honeydew',
                            width: '100%',
                        }}
                    >
                        <Grid item xs={12} md={8} />
                        <Grid
                            item
                            xs={12}
                            md={4}
                            container
                            style={{ padding: '8px' }}
                        >
                            <TownhallProvider townhallId='123' value={townhall}>
                                <FixtureSocket.Provider value={emitter}>
                                    <PaneProvider>
                                        <TownhallPanes />
                                    </PaneProvider>
                                </FixtureSocket.Provider>
                            </TownhallProvider>
                        </Grid>
                    </div>
                </Grid>
            </Layout>
        </UserProvider>
    );
}
