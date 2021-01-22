import React from 'react';
import { Meta } from '@storybook/react';

import UserProvider from 'contexts/User';
import Component from './PromptReg';

export default {
    title: 'Domains/Auth/Prompt Reg',
    decorators: [
        (Story) => (
            <UserProvider>
                <Story />
            </UserProvider>
        ),
    ],
} as Meta;

export const PromptReg = () => <Component forceOpen />;
