/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { makeQuestion, makeTownhall, makeUser, Question } from 'prytaneum-typings';

import TownhallProvider from 'contexts/Townhall';
import UserProvider from 'contexts/User';
import Component from './QuestionForm';

export default {
    title: 'Domains/Questions/Question Form',
    decorators: [
        (MyStory) => (
            <UserProvider value={makeUser()} forceNoLogin>
                <TownhallProvider townhallId='123' value={makeTownhall()} forceNoFetch>
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
