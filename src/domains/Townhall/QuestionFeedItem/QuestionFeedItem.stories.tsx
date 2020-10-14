import React from 'react';
import faker from 'faker';
import Typography from '@material-ui/core/Typography';

import Page from 'layout/Page';
import QuestionFeedItem from './QuestionFeedItem';
import { Question as QuestionType, QuestionState } from '../types';

export default { title: 'Domains/Townhall/QuestionFeed Item' };

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

function makeQuestions(num: number) {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(makeQuestion());
    }
    return arr;
}

// FIXME:
export function Basic() {
    const [state, setState] = React.useState(() => makeQuestions(100));

    return (
        <div style={{ height: '100%' }}>
            <button
                type='button'
                onClick={() =>
                    setState((prev) => [...prev, ...makeQuestions(100)])
                }
            >
                Add 100 questions
            </button>
            <div>
                count:
                {state.length}
            </div>
            <Page>
                {state.map((question) => {
                    const { _id, question: text, meta, aiml } = question;
                    return (
                        <QuestionFeedItem
                            key={_id}
                            user={meta.user.name}
                            timestamp={meta.timestamp}
                        >
                            <Typography paragraph>{text}</Typography>
                        </QuestionFeedItem>
                    );
                })}
            </Page>
        </div>
    );
}
