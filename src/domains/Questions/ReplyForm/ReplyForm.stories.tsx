import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Container from 'layout/Container';
import Component from './ReplyForm';

export default { title: 'Domains/Questions/Reply Form' };

export function Basic() {
    return (
        <Container>
            <Component replyTo={makeQuestion()} />
        </Container>
    );
}
