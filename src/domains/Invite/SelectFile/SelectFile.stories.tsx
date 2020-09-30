import React from 'react';

import { DeviceContext } from 'contexts/Device';

import Component from './SelectFile';

export default {
    title: 'Components/Invite/SelectFile',
    component: Component,
    argTypes: {
        DeviceType: {
            control: {
                type: 'select',
                options: ['desktop', 'mobile'],
            },
        },
    },
};

interface Props {
    DeviceType: 'desktop' | 'mobile';
}

export function Basic({ DeviceType }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component initialState={undefined} onComplete={() => {}} />
        </DeviceContext.Provider>
    );
}

Basic.args = {
    DeviceType: 'desktop',
};
