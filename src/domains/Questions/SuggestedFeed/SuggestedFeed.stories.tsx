import React from 'react';
import { makeQuestion, makeGenFn, Question } from 'prytaneum-typings';

import Main from 'layout/Main';

import FeedComponent from './SuggestedFeed';

export default { title: 'Domains/Questions/Suggested Feed' };

const questions = makeGenFn(makeQuestion)(15);
questions[1]._id = '1';
const likedQuestions = questions.map((question) => ({
    ...question,
    likes: new Array(Math.round(Math.random() * 10)).fill(0),
}));

export function SuggestedFeed() {
    const [_questions, setQuestions] = React.useState(likedQuestions);
    const [buffer, setBuffer] = React.useState<Question[]>([]);

    const handleClick = () => {
        setBuffer([...buffer, ...makeGenFn(makeQuestion)(5)]);
    };
    const handleFlush = () => {
        setQuestions([...buffer, ..._questions]);
        setBuffer([]);
    };

    const handleRandomize = () => {
        setQuestions((prev) =>
            prev.map((question) => ({
                ...question,
                likes: new Array(Math.round(Math.random() * 100)).fill(0),
            }))
        );
    };
    return (
        <Main>
            <div style={{ paddingBottom: '8px' }}>
                <button onClick={handleClick} type='button'>
                    Add questions to suggested
                </button>
                <button onClick={handleRandomize} type='button'>
                    Randomize Likes
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
