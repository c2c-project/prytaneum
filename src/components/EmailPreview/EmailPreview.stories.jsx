import React from 'react';
import faker from 'faker';
import { withKnobs, select } from '@storybook/addon-knobs';

import { DeviceContext } from 'contexts/Device';

import EmailPreview from './EmailPreview';

export default { title: 'UploadForm', decorators: [withKnobs] };

export function EmailPreviewDefault() {
    const props = {
        fName: faker.name.firstName(),
        MoC: faker.name.firstName(),
        topic: 'Topic',
        eventDateTime: faker.date.future().toISOString(),
        constituentScope: 'state',
        registrationLink: 'http://prytaneum/register',
    };
    return (
        <DeviceContext.Provider
            value={select('DeviceType', ['desktop', 'mobile'], 'desktop')}
        >
            <EmailPreview props={props} />
        </DeviceContext.Provider>
    );
}
