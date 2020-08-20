import React from 'react';
import faker from 'faker';

import FixtureContext, { makeSuccessFixture } from 'mock/Fixtures';
import Component from '.';

export default { title: 'Domains/Townhall' };

const recent = faker.date.recent();
const future = faker.date.future();
const makeEvent = () => ({
    _id: faker.random.alphaNumeric(5),
    speaker: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        party: faker.name.title(),
        territory: faker.name.jobTitle(),
    },
    moderator: faker.company.companyName(),
    topic: faker.company.bsBuzz(),
    picture: faker.image.animals(),
    readingMaterials: '',
    date: faker.date.between(recent, future),
    alignment: 'Dark Side',
});

const makeEvents = (amount: number) => {
    const list = [];
    for (let i = 0; i < amount; i += 1) {
        list.push(makeEvent());
    }
    return list;
};

export function TownhallList() {
    return (
        <FixtureContext.Provider
            value={makeSuccessFixture({ list: makeEvents(40) })}
        >
            <Component />
        </FixtureContext.Provider>
    );
}
