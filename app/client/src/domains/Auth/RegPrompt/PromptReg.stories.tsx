import * as React from 'react';
import { Meta } from '@storybook/react';

import UserProvider from '@local/contexts/User';
import Component from './PromptReg';

export default {
    title: '@local/domains/Auth/Prompt Reg',
    decorators: [
        (Story) => (
            <UserProvider>
                <Story />
            </UserProvider>
        ),
    ],
} as Meta;

export const PromptReg = () => <Component forceOpen />;
