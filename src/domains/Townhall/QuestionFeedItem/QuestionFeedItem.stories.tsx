import React from 'react';
import faker from 'faker';

import Page from 'layout/Page';
import { UserBar, ModBar } from '../QuestionFeed/components';
import Question from './QuestionFeedItem';

export default { title: 'Domains/Townhall/QuestionFeed Item' };

export function UserQuestion() {
    return (
        <Page maxWidth='sm'>
            <h4>Normal</h4>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={<UserBar onClick={console.log} />}
            >
                {faker.lorem.sentences(4)}
            </Question>
            <h4>Compact</h4>
            <Question
                compact
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={<UserBar onClick={console.log} />}
            >
                {faker.lorem.sentences(4)}
            </Question>
        </Page>
    );
}

export function ModQuestion() {
    return (
        <Page maxWidth='sm'>
            <h4>Not In Queue</h4>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={
                    <ModBar
                        questionState=''
                        labels={Array.from(
                            new Set(faker.random.words(10).split(' '))
                        )}
                        onClick={console.log}
                    />
                }
                onClickMore={() => console.log('asdf')}
            >
                {faker.lorem.sentences(4)}
            </Question>
            <h4>Not In Queue</h4>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={
                    <ModBar
                        questionState=''
                        labels={Array.from(
                            new Set(faker.random.words(10).split(' '))
                        )}
                        onClick={console.log}
                    />
                }
            >
                {faker.lorem.sentences(4)}
            </Question>
            <h4>In Queue</h4>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={
                    <ModBar
                        questionState='IN_QUEUE'
                        labels={Array.from(
                            new Set(faker.random.words(10).split(' '))
                        )}
                        onClick={console.log}
                    />
                }
            >
                {faker.lorem.sentences(4)}
            </Question>
            <h4>Asked</h4>
            <Question
                user={faker.internet.userName()}
                timestamp={new Date().toISOString()}
                actionBar={
                    <ModBar
                        questionState='ASKED'
                        labels={Array.from(
                            new Set(faker.random.words(10).split(' '))
                        )}
                        onClick={console.log}
                    />
                }
            >
                {faker.lorem.sentences(4)}
            </Question>
        </Page>
    );
}
