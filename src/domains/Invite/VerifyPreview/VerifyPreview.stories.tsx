import React from 'react';
import faker from 'faker/locale/en';
import { makeGenFn } from 'prytaneum-typings';

import Component from './VerifyPreview';

export default {
    title: 'Components/Invite/Verify Preview',
    component: Component,
};

const makeData = makeGenFn(() => ({
    email: faker.internet.email(),
    fName: faker.name.firstName(),
    lName: faker.name.lastName(),
}));
const expectedKeys = ['email', 'fName', 'lName'];

export const Basic = () => <Component data={makeData(5)} expectedKeys={expectedKeys} />;
