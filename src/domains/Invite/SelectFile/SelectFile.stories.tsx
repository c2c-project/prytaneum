import React from 'react';

import { DeviceContext } from 'contexts/Device';

import Component from './SelectFile';

export default {
    title: 'Components/Invite',
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

export function SelectFile({ DeviceType }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component initialState={undefined} onComplete={() => {}} />
        </DeviceContext.Provider>
    );
}

SelectFile.args = {
    DeviceType: 'desktop',
};
