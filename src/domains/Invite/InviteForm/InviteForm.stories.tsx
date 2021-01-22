import React from 'react';
import { Meta } from '@storybook/react';
import { rest } from 'msw';

import TownhallProvider from 'contexts/Townhall';
import UserProvider from 'contexts/User';
import { worker } from 'mock/browser';

import Component from '.';

export default {
    title: 'Domains/Invite',
    component: Component,
    argTypes: {
        Status: {
            control: {
                type: 'select',
                options: ['succeed', 'fail'],
            },
        },
    },
    decorators: [
        (Story) => (
            <TownhallProvider townhallId='123'>
                <UserProvider>
                    <div style={{ flex: 1, padding: 30 }}>
                        <Story />
                    </div>
                </UserProvider>
            </TownhallProvider>
        ),
    ],
} as Meta;

interface Props {
    status: 'succeed' | 'fail';
}

export function InviteForm({ status }: Props) {
    if (status === 'succeed') {
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
    return <Component />;
}

InviteForm.args = {
    Status: 'succeed',
};
