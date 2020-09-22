/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import faker from 'faker';

import Dialog from 'components/Dialog';
import Component from './SettingsMenu';

export default { title: 'Components/SettingsMenu' };

const content = <h1>content here</h1>;
const content2 = (onclick: () => void) => {
    return ( 
        <List>
            <li>
                <ListItem button onClick={onclick}>
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
};
const content3 = (
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
        data.push({ title: faker.random.word(), content: content2 });
    }
    return data;
};

const DialogContent1 = () => <h1>dialog 1 content aaaaaaa</h1>;
const DialogContent2 = () => <h1>dialog 2 content bbbbbbb</h1>;
const DialogContent3 = () => <h1>dialog 3 content ccccccc</h1>;
const DialogContent4 = () => <h1>dialog 4 content ddddddd</h1>;

const dialogData = [
    { text: 'about', component: DialogContent1 },
    { text: 'feedback', component: DialogContent2 },
    { text: 'delete', component: DialogContent3 },
    { text: 'aboutdevs', component: DialogContent4 },
];

export function SettingsMenu() {
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);

    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    const content2 = () => {
        return dialogData.map(({ text, component }) => (
            <List>
                <ListItem
                    key={text}
                    button
                    onClick={() => setContent(component)}
                >
                    <ListItemText primary={text} />
                </ListItem>
            </List>
        ));
    };
    const info = { title: 'Information', content: content2() };
    const info2 = { title: 'Information2', content: content2() };
    const sections = [info, info2];

    return (
        <div>
            {sections.map(({ title, content }) => (
                <div style={{ height: '100%', top: '0' }}>
                    <Component title={title} content={content} />
                </div>
            ))}
            <List>
                {dialogData.map(({ text, component }) => (
                    <ListItem
                        key={text}
                        button
                        onClick={() => setContent(component)}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={() => setContent(null)}>
                {cont || <div />}
            </Dialog>
        </div>
    );
}
