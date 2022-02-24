import * as React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import faker from 'faker/locale/en';

import { SettingsMenu as Component } from './SettingsMenu';

export default { title: '@local/components/SettingsMenu' };

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
            <Component config={sections} />
        </div>
    );
}
