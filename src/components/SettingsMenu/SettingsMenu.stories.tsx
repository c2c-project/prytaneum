import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import faker from 'faker/locale/en';

import Component from './SettingsMenu';

export default { title: 'Components/SettingsMenu' };

const content2 = (
    <List>
        <li>
            <ListItem button>
                <ListItemText primary='about' />
            </ListItem>
        </li>
        <li>
            <ListItem button>
                <ListItemText primary='feedback' />
            </ListItem>
        </li>
        <li>
            <ListItem button>
                <ListItemText primary='delete account' />
            </ListItem>
        </li>
        <li>
            <ListItem button>
                <ListItemText primary='about the devs' />
            </ListItem>
        </li>
    </List>
);

const makeSections = (num?: number) => {
    const iterations = num || 1;
    const data = [];
    for (let i = 0; i < iterations; i += 1) {
        data.push({
            title: faker.random.word(),
            component: content2,
            description: faker.random.words(5),
        });
    }
    return data;
};

export function SettingsMenu() {
    const sections = makeSections(50);
    return (
        <div>
            <Component config={sections} title='Storybook' />
        </div>
    );
}
