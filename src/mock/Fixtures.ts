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

export function makeSuccessFixture(data?: Record<string, any>) {
    return {
        meta: { status: 200, statusText: 'OK', config: {}, headers: {} },
        data,
    };
}

export function makeFailureFixture(data?: Record<string, any>) {
    return {
        meta: {
            status: 400,
            statusText: 'BAD REQUEST',
            config: {},
            headers: {},
        },
        data,
    };
}

export default React.createContext<Fixture>(makeSuccessFixture());
