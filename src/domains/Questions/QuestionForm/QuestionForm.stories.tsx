import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Container from 'layout/Container';
import Component from './QuestionForm';

export default { title: 'Domains/Questions/Question Form' };

export function Basic() {
    return (
        <Container>
            <Component />
        </Container>
    );
}

export function WithQuote() {
    return (
        <Container>
            <Component quote={makeQuestion()} />
        </Container>
    );
}
