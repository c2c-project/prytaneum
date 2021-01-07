import React from 'react';
import { makeQuestion, makeGenFn } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import QuestionQueue from './QuestionQueue';
import QueueComponent from './Queue';

export default { title: 'Domains/Questions/Question Queue' };

export function Basic() {
    return <QuestionQueue />;
}

const questions = makeGenFn(makeQuestion)(15);
questions[1]._id = '1';

export function Queue() {
    return (
        <UserProvider>
            <Layout>
                <QueueComponent questions={questions} />
            </Layout>
        </UserProvider>
    );
}
