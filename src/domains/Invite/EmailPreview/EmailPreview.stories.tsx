/* eslint-disable react/prop-types */
import React from 'react';
import faker from 'faker/locale/en';
import jwt from 'jsonwebtoken';

import { DeviceContext } from 'contexts/Device';

import Component, { Props as EmailPreviewProps } from './EmailPreview';

export default {
    title: 'Components/Invite/Email Preview',
    component: Component,
    argTypes: {
        DeviceType: {
            control: {
                type: 'select',
                options: ['desktop', 'mobile'],
            },
        },
        constituentScope: {
            control: {
                type: 'select',
                options: ['district', 'state'],
            },
        },
    },
};

interface Props extends EmailPreviewProps {
    DeviceType: 'desktop' | 'mobile';
}

export function Basic({
    DeviceType,
    fName,
    MoC,
    topic,
    eventDateTime,
    constituentScope,
    registrationLink,
}: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component
                fName={fName}
                MoC={MoC}
                topic={topic}
                eventDateTime={eventDateTime}
                constituentScope={constituentScope}
                registrationLink={registrationLink}
            />
        </DeviceContext.Provider>
    );
}

Basic.args = {
    DeviceType: 'desktop',
    fName: faker.name.firstName(),
    MoC: faker.name.firstName(),
    topic: 'Technology',
    eventDateTime: faker.date.future().toUTCString(),
    constituentScope: 'state',
    registrationLink: `https://prytaneum.io/invite/${jwt.sign(
        { email: faker.internet.email(), townhallId: 'test' },
        'secret'
    )}`,
};
