/* eslint-disable */
import React from 'react';
import { makeQuestion } from 'prytaneum-typings';
import CardActions from '@material-ui/core/CardActions';

import Main from 'layout/Main';
import QuestionCard from '../QuestionCard';
import LikeAction from './Like';
import QuoteAction from './Quote';
import ReplyAction from './Reply';

export default { title: 'Domains/Questions/Question Actions' };

export function User() {
    return (
        <Main>
            <QuestionCard question={makeQuestion()}>
                <CardActions>
                    <LikeAction
                        townhallId='123'
                        questionId='123'
                        onLike={() => console.log('liked')}
                    />
                    <QuoteAction question={makeQuestion()} />
                    <ReplyAction question={makeQuestion()} />
                </CardActions>
            </QuestionCard>
        </Main>
    );
}
