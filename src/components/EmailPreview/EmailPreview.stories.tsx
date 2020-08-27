/* eslint-disable react/prop-types */
import React from 'react';
import faker from 'faker';

import { DeviceContext } from 'contexts/Device';

import EmailPreview, { Props as EmailPreviewProps } from './EmailPreview';

export default {
    title: 'Invite/UploadForm',
    component: EmailPreview,
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

export function EmailPreviewDefault({
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
            <EmailPreview
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

EmailPreviewDefault.args = {
    fName: faker.name.firstName(),
    MoC: faker.name.firstName(),
    topic: 'Technology',
    eventDateTime: faker.date.future().toUTCString(),
    constituentScope: 'state',
    registrationLink: `https://connectingtocongress.org/invite/${faker.random.uuid()}`,
};
