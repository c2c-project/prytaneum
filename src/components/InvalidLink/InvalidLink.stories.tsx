import React from 'react';

import { DeviceContext } from 'contexts/Device';

import InvalidLink from '.';

export default {
    title: 'Components/Invite',
    component: InvalidLink,
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

export function InvalidLinkDefault({ DeviceType, errorMessage }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <InvalidLink errorMessage={errorMessage} />
        </DeviceContext.Provider>
    );
}

InvalidLinkDefault.args = {
    DeviceType: 'desktop',
    errorMessage: 'Invalid Link',
};
