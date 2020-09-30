import React from 'react';

import { DeviceContext } from 'contexts/Device';

import Component from './InvalidLink';

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
    errorMessage: string;
}

export function InvalidLink({ DeviceType, errorMessage }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component errorMessage={errorMessage} />
        </DeviceContext.Provider>
    );
}

InvalidLink.args = {
    DeviceType: 'desktop',
    errorMessage: 'Invalid Link',
};
