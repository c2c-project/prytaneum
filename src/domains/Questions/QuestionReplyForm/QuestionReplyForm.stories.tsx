import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Page from 'layout/Page';
import Component from './QuestionReplyForm';

export default { title: 'Domains/Townhall/Question Reply Form' };

export function Basic() {
    return (
        <Page>
            <Component replyTo={makeQuestion()} />
        </Page>
    );
}
