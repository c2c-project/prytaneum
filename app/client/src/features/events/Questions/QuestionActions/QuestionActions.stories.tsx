/* eslint-disable react/prop-types */
import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { CardActions } from '@material-ui/core';
import { makeQuestion, makeTownhall, makeUser } from 'prytaneum-typings';

import TownhallProvider from '@local/contexts/Townhall';
import UserProvider from '@local/contexts/User';
import LikeAction from './Like';
import QuoteAction from './Quote';
import ReplyAction from './Reply';
import Suggest from './Suggest';
import QueueButton from './QueueButton';
import QuestionCard from '../QuestionCard';

export default {
    title: '@local/domains/Questions/Question Actions',
    parameters: { layout: 'centered' },
    decorators: [
        (MyStory) => (
            <TownhallProvider value={makeTownhall()} forceNoFetch townhallId='123'>
                <UserProvider value={makeUser()} forceNoLogin>
                    <MyStory />
                </UserProvider>
            </TownhallProvider>
        ),
    ],
} as Meta;

interface Props {
    suggested: boolean;
    liked: boolean;
    onLike: () => void;
    onDeleteLike: () => void;
}

const Template: Story<Props> = ({ suggested, onLike, onDeleteLike, liked }) => (
    <>
        <Suggest questionId='123' townhallId='123' suggested={suggested} />
        <LikeAction townhallId='123' questionId='123' onLike={onLike} liked={liked} onDeleteLike={onDeleteLike} />
        <QuoteAction question={makeQuestion()} />
        <ReplyAction question={makeQuestion()} />
        <QueueButton isQueued={false} questionId={makeQuestion()._id} townhallId='123' />
    </>
);

export const AllActions = Template.bind({});
AllActions.args = {
    suggested: false,
    liked: false,
};
AllActions.argTypes = {
    onLike: { action: 'liked' },
    onDeleteLike: { action: 'unliked' },
};

export const ExampleUsage = () => (
    <QuestionCard question={makeQuestion()}>
        <CardActions>
            <QuoteAction question={makeQuestion()} />
        </CardActions>
    </QuestionCard>
);
