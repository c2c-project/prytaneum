import React from 'react';

import { DeviceContext } from 'contexts/Device';

import InvalidInviteLink from '.';

export default {
    title: 'Components/Invite',
    component: InvalidInviteLink,
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

export function InvalidInviteLinkDefault({ DeviceType, errorMessage }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <InvalidInviteLink errorMessage={errorMessage} />
        </DeviceContext.Provider>
    );
}

InvalidInviteLinkDefault.args = {
    DeviceType: 'desktop',
    errorMessage: 'Invalid Link',
};
