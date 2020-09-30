import React from 'react';
import faker from 'faker';

import { DeviceContext } from 'contexts/Device';

import Component from './VerifyPreview';

export default {
    title: 'Components/Invite/Verify Preview',
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
            <Component data={previewData} expectedKeys={expectedKeys} />
        </DeviceContext.Provider>
    );
}

Basic.args = {
    DeviceType: 'desktop',
};
