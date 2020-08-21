import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';

export default {
    title: 'Domains/ReportList',
    component: Component,
};

const recent = faker.date.recent();
const future = faker.date.future();

const makeReport = () => ({
    _id: faker.random.alphaNumeric(5),
    date: faker.date.between(recent, future).toISOString(),
    description: faker.lorem.paragraphs(),
    user: {
        _id: faker.random.alphaNumeric(5),
    },
});

const makeReports = (numberOfReports: number) => {
    const list = [];
    for (let i = 0; i < numberOfReports; i += 1) {
        list.push(makeReport());
    }
    return list;
};

export function ReportList() {
    return (
        <Container maxWidth='sm'>
            <Component Reports={makeReports(10)} />
        </Container>
    );
}
