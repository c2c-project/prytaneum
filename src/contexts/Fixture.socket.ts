import React from 'react';

export interface Fixture<T = any> {
    meta: {
        timeout?: number;
        status: number;
        statusText: string;
        config: Record<string, unknown>;
        headers: Record<string, string>;
    };
    data?: T;
}

/** Returns a Fixture, containing HTTP header information like status, timeout, etc
 *  @category Context
 *  @constructor makeSuccessFixture
 *  @param {Record<string, any>} data @todo
*/
export function makeSuccessFixture(data?: Record<string, any>) {
    return {
        meta: { status: 200, statusText: 'OK', config: {}, headers: {} },
        data,
    };
}

export default React.createContext<Fixture>(makeSuccessFixture());
