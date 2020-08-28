import React from 'react';

import { DeviceContext } from 'contexts/Device';
import FixtureContext, {
    makeSuccessFixture,
    makeFailureFixture,
} from 'mock/Fixtures';

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
        Registered: {
            control: {
                type: 'select',
                options: ['true', 'false'],
            },
        },
    },
};

interface Props {
    DeviceType: 'desktop' | 'mobile';
    Status: 'succeed' | 'fail';
    Registered: 'true' | 'false';
}

export function HandleInviteLink({ DeviceType, Status, Registered }: Props) {
    let statusFixture;
    if (Status === 'succeed')
        statusFixture = makeSuccessFixture({ response: 'success' });
    else statusFixture = makeFailureFixture({ response: 'fail' });
    return (
        <DeviceContext.Provider value={DeviceType}>
            <FixtureContext.Provider value={statusFixture}>
                <Component />
            </FixtureContext.Provider>
        </DeviceContext.Provider>
    );
}

HandleInviteLink.args = {
    DeviceType: 'desktop',
    Status: 'succeed',
};
