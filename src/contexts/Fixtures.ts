import React from 'react';

export interface Fixture {
    meta: {
        timeout?: number;
        status: number;
        statusText: string;
        config: Record<string, unknown>;
        headers: Record<string, string>;
    };
    data?: Record<string, any>;
}

export default React.createContext<Fixture>({
    meta: { status: 200, statusText: 'OK', config: {}, headers: {} },
});
