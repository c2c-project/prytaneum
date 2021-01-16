import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Main from 'layout/Main';
import Component from './ReplyForm';

export default { title: 'Domains/Questions/Reply Form' };

export function Basic() {
    return (
        <Main>
            <Component replyTo={makeQuestion()} />
        </Main>
    );
}
