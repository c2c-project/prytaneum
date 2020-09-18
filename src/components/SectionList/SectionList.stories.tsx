import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import Paper from 'components/Paper';
import LoginForm from 'domains/Auth/LoginForm';
import Component, { Section, Datum } from '.';

import { useHistory } from 'react-router-dom';

export default {
    title: 'Components/SectionList',
    component: Component,
};

const makeDatum = (): Datum => ({
    image: 'https://i.imgur.com/3beQH5s.jpeg',
    title: `${faker.name.firstName()} ${faker.name.lastName()}`,
    subtitle: (
        `${faker.lorem.words(10)}`
    ),
});

const makeSectionData = (num: number): Datum[] => {
    const data = [];
    for (let i = 0; i < num; i += 1) {
        data.push(makeDatum());
    }
    return data;
};

const makeSections = (num: number): Section[] => {
    const data = [];
    for (let i = 0; i < num; i += 1) {
        data.push({
            title: faker.commerce.department(),
            sectionData: makeSectionData(num),
        });
    }
    return data;
};

export function SectionList({ sections }: { sections: Section[] }) {
    const history = useHistory();
    return (
        <Container
            maxWidth='md'
            style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
        >
            <Component sections={sections} />
        </Container>
    );
}
SectionList.args = { sections: makeSections(3) };
