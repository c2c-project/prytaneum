import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Page from 'layout/Page';
import Component from './QuestionForm';

export default { title: 'Domains/Questions/Question Form' };

export function Basic() {
    return (
        <Page>
            <Component />
        </Page>
    );
}

export function WithQuote() {
    return (
        <Page>
            <Component quote={makeQuestion()} />
        </Page>
    );
}
