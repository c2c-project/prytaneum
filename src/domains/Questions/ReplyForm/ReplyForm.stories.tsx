import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Page from 'layout/Page';
import Component from './ReplyForm';

export default { title: 'Domains/Questions/Reply Form' };

export function Basic() {
    return (
        <Page>
            <Component replyTo={makeQuestion()} />
        </Page>
    );
}
