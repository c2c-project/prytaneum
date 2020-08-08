import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import faker from 'faker';

import { DeviceContext } from 'contexts/Device';

import SelectFile from './SelectFile';
import Preview from './VerifyPreview';

export default { title: 'FileSelect', decorators: [withKnobs] };

export function SelectFileDefault() {
    return (
        <DeviceContext.Provider
            value={select('DeviceType', ['desktop', 'mobile'], 'desktop')}
        >
            <SelectFile initialState={undefined} onComplete={() => {}} />
        </DeviceContext.Provider>
    );
}

export function VerifyPreviewDefault() {
    const previewData = [];
    const preview = 5;
    for (let i = 0; i < preview; i += 1) {
        const data = {
            email: faker.internet.email(),
            fName: faker.name.firstName(),
            lName: faker.name.lastName(),
        };
        previewData.push(data);
    }
    const expectedKeys = ['email', 'fName', 'lName'];
    return (
        <DeviceContext.Provider
            value={select('DeviceType', ['desktop', 'mobile'], 'desktop')}
        >
            <Preview data={previewData} expectedKeys={expectedKeys} />
        </DeviceContext.Provider>
    );
}
