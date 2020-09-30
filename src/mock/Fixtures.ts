import React from 'react';

export interface Fixture<T extends Record<string, unknown>> {
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
export function makeSuccessFixture(data?: Record<string, unknown>) {
    return {
        meta: { status: 200, statusText: 'OK', config: {}, headers: {} },
        data,
    };
}

export default React.createContext<Fixture<Record<string, unknown>>>(
    makeSuccessFixture()
);
