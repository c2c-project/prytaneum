/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { makeQuestion, Question } from 'prytaneum-typings';

import TownhallProvider from 'contexts/Townhall';
import UserProvider from 'contexts/User';
import Component from './QuestionForm';

export default {
    title: 'Domains/Questions/Question Form',
    decorators: [
        (MyStory) => (
            <UserProvider>
                <TownhallProvider townhallId='123'>
                    <MyStory />
                </TownhallProvider>
            </UserProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
} as Meta;

const Template: Story<{ quote: Question }> = ({ quote }) => <Component quote={quote} />;

export const Basic = Template.bind({});
Basic.args = {
    quote: undefined,
};

export const QuotedQuestion = Template.bind({});
QuotedQuestion.args = {
    quote: makeQuestion(),
};
