import React from 'react';
import faker from 'faker';

import { DeviceContext } from 'contexts/Device';

import SelectFile from './SelectFile';
import Preview from './VerifyPreview';

export default {
    title: 'Invite/FileSelect',
    component: SelectFile,
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

export function SelectFileDefault({ DeviceType }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <SelectFile initialState={undefined} onComplete={() => {}} />
        </DeviceContext.Provider>
    );
}

export function VerifyPreviewDefault({ DeviceType }: Props) {
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
        <DeviceContext.Provider value={DeviceType}>
            <Preview data={previewData} expectedKeys={expectedKeys} />
        </DeviceContext.Provider>
    );
}

VerifyPreviewDefault.args = {
    DeviceType: 'desktop',
};
