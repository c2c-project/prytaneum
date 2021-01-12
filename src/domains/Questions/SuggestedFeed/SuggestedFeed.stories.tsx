import React from 'react';
import { makeQuestion, makeGenFn, Question } from 'prytaneum-typings';

import Main from 'layout/Main';

import FeedComponent from './SuggestedFeed';

export default { title: 'Domains/Questions/Suggested Feed' };

const questions = makeGenFn(makeQuestion)(15);
questions[1]._id = '1';

export function SuggestedFeed() {
    const [_questions, setQuestions] = React.useState(questions);
    const [buffer, setBuffer] = React.useState<Question[]>([]);
    const handleClick = () => {
        setBuffer([...buffer, ...makeGenFn(makeQuestion)(5)]);
    };
    const handleFlush = () => {
        setQuestions([...buffer, ..._questions]);
        setBuffer([]);
    };
    return (
        <Main>
            <div style={{ paddingBottom: '8px' }}>
                <button onClick={handleClick} type='button'>
                    Add questions to suggested
                </button>
            </div>
            <FeedComponent
                onFlushBuffer={handleFlush}
                bufferSize={buffer.length}
                questions={_questions}
            />
        </Main>
    );
}
