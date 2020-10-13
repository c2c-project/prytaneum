import React from 'react';
import faker from 'faker';

import Page from 'layout/Page';
import { Question as QuestionType, QuestionState } from '../types';
import Component from './QuestionReplyForm';

export default { title: 'Domains/Townhall/Question Reply Form' };

function makeState(): QuestionState {
    const number = Math.random();
    if (number < 0.25) {
        return 'ASKED';
    }
    if (number < 0.5) {
        return 'CURRENT';
    }
    if (number < 0.75) {
        return 'IN_QUEUE';
    }
    return '';
}

function makeQuestion(): QuestionType {
    return {
        _id: faker.random.alphaNumeric(12),
        meta: {
            user: {
                _id: faker.random.alphaNumeric(12),
                name: faker.internet.userName(),
            },
            timestamp: new Date().toISOString(),
            townhallId: faker.random.alphaNumeric(12),
        },
        question: faker.lorem.sentences(5),
        state: makeState(),
        likes: [],
        aiml: {
            labels: Array.from(new Set(faker.random.words(10).split(' '))),
        },
    };
}

export function Basic() {
    return (
        <Page>
            <Component replyTo={makeQuestion()} />
        </Page>
    );
}
