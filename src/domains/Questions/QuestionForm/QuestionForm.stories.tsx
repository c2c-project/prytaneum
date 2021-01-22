import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Main from 'layout/Main';
import Component from './QuestionForm';

export default { title: 'Domains/Questions/Question Form' };

export function Basic() {
    return (
        <Main>
            <Component />
        </Main>
    );
}

export function WithQuote() {
    return (
        <Main>
            <Component quote={makeQuestion()} />
        </Main>
    );
}
