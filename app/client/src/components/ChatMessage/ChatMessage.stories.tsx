import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { makeChatMessage } from 'prytaneum-typings';
import StarIcon from '@material-ui/icons/Star';

import ChatMessage from './ChatMessage';

export default {
    title: '@local/components/Chat Message',
    component: ChatMessage,
    parameters: {
        layout: 'centered',
    },
} as Meta;

interface Props {
    icon: React.ReactNode | undefined;
}

const message = makeChatMessage();
const Template: Story<Props> = ({ icon }: Props) => (
    <ChatMessage
        name={message.meta.createdBy.name.first}
        timestamp={message.meta.createdAt}
        message={message.message}
        icon={icon}
    />
);

export const Basic = Template.bind({});
Basic.args = {
    icon: undefined,
};

export const SpecialIcon = Template.bind({});
SpecialIcon.args = {
    icon: <StarIcon />,
};
