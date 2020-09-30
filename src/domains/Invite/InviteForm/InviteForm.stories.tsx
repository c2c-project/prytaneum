import React from 'react';
import { rest } from 'msw';

import { DeviceContext } from 'contexts/Device';
import { worker } from 'mock/browser';

import Component from '.';

export default {
    title: 'Domains/Invite',
    component: Component,
    argTypes: {
        DeviceType: {
            control: {
                type: 'select',
                options: ['desktop', 'mobile'],
            },
        },
        Status: {
            control: {
                type: 'select',
                options: ['succeed', 'fail'],
            },
        },
    },
};

interface Props {
    DeviceType: 'desktop' | 'mobile';
    Status: 'succeed' | 'fail';
}

export function InviteForm({ DeviceType, Status }: Props) {
    if (Status === 'succeed') {
        worker.use(
            rest.post('/api/invite', (req, res, ctx) => {
                return res.once(ctx.status(200));
            })
        );
    } else {
        worker.use(
            rest.post('/api/invite', (req, res, ctx) => {
                return res.once(ctx.status(400));
            })
        );
    }
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component />
        </DeviceContext.Provider>
    );
}

InviteForm.args = {
    DeviceType: 'desktop',
    Status: 'succeed',
};
