import React from 'react';
import { EventEmitter } from 'events';
// import faker from 'faker/locale/en';

// export type Fixture = [SocketIOClient.Socket, NodeJS.Timeout];
export type Fixture = SocketIOClient.Socket;

export function makeEmitter(): Fixture {
    const event = new EventEmitter();
    // const handle = setInterval(() => {
    //     event.emit('data', faker.lorem.sentence());
    // }, 10000); // 10 seconds
    const e = (event as unknown) as SocketIOClient.Socket; // pretty gross :\
    return e;
}

export default React.createContext<Fixture>(makeEmitter());
