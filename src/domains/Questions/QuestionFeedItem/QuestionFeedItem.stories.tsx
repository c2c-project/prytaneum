import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeQuestion } from 'prytaneum-typings';

import VList from 'components/VList';
import QuestionFeedItem from './QuestionFeedItem';

export default { title: 'Domains/Questions/QuestionFeed Item' };

function makeQuestions(num: number) {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(makeQuestion());
    }
    return arr;
}

// FIXME: will be fixed by fixing the vlist component
export function Basic() {
    const [state, setState] = React.useState(() => makeQuestions(100));

    return (
        <div style={{ height: '100%' }}>
            <button
                type='button'
                onClick={() =>
                    setState((prev) => [...makeQuestions(50), ...prev])
                }
            >
                Add 100 questions
            </button>
            <div>
                count:
                {state.length}
            </div>
            <div style={{ height: '80%' }}>
                <VList loadDir='top' onLoadMore={() => {}}>
                    {state.map((question, idx) => {
                        const { _id, question: text, meta } = question;
                        return (
                            <QuestionFeedItem
                                key={_id}
                                user={meta.createdBy.name.first}
                                timestamp={meta.createdAt}
                            >
                                <Typography paragraph>
                                    {`${text} idx: ${idx}`}
                                </Typography>
                            </QuestionFeedItem>
                        );
                    })}
                </VList>
            </div>
        </div>
    );
}
