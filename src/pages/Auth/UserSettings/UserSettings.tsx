/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';
import SectionList from 'components/SectionList';
import { List, ListItem, ListItemText } from '@material-ui/core';

import UserProfile from 'components/UserProfile';
import Options from 'components/Options';
import AccountSettings from 'components/AccountSettings';
import Information from 'components/Information';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
    },
}));

interface Props {
    id?: string;
}

export default function UserSettings({ id }: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState<JSX.Element | null>(null);

    React.useEffect(() => {
        if (content !== null) setOpen(true);
        if (content === null) setOpen(false);
    }, [content]);

    const openStateArr: {
        s: [
            string,
            JSX.Element,
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>,
            (
                e: React.Dispatch<React.SetStateAction<boolean>>,
                b: boolean
            ) => void
        ];
    }[] = [
        // { s: Options().dialogData[0] },
        // { s: AccountSettings().dialogData[0] },
        // { s: AccountSettings().dialogData[1] },
        // { s: AccountSettings().dialogData[2] },
        // {
        //     s: [
        //         Information().dialogData[0][0],
        //         Information().dialogData[0][1],
        //         Information().dialogData[0][2],
        //         Information().dialogData[0][3],
        //         Information().hc,
        //     ],
        // },
        // { s: [Information().dialogData[1][0], Information().dialogData[1][1], openAboutUs, setOpenAboutUs, Information().handleChange] },
        // { s: [Information().dialogData[2][0], Information().dialogData[2][1], openPrivacyPolicy, setOpenPrivacyPolicy, Information().handleChange] },
        // { s: [Information().dialogData[3][0], Information().dialogData[3][1], openTOS, setOpenTOS, Information().handleChange] },
    ];

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

    const sections = [
        {
            title: UserProfile().title,
            content: content2()
        },
        {
            title: Options().title,
            content: content2(),
        },
        {
            title: AccountSettings().title,
            content: content2(),
        },
        {
            title: Information().title,
            content: content2(),
        },
    ];

    return (
        <Container
            id={id}
            maxWidth='md'
            disableGutters
            style={{
                width: '100%',
                height: '100%',
                overflowY: 'scroll',
            }}
        >
            <Paper className={classes.paper}>
                <MemoryRouter initialEntries={['/User Settings']}>
                    <Route path='/:title'>
                        <AppBar back />
                    </Route>
                </MemoryRouter>
                {sections.map(({ title, content }) => (
                    <div style={{ height: '100%', top: '0' }}>
                        <SettingsMenu title={title} content={content} />
                    </div>
                ))}
                {dialogData.map(({ text, component }) => (
                    <ListItem
                        key={text}
                        button
                        onClick={() => setContent(component)}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                {/* <Dialog
                    open={s[2]}
                    title={s[0]}
                    onClose={() => setContent(null)}
                >
                    {s[1] || <div />}
                </Dialog> */}
            </Paper>
        </Container>
    );
}

UserSettings.defaultProps = {
    id: 'UserSettings',
};

/*
 - React components can be saved in state
 - make own list instead of using seciton list, to get rid of clickable area that does nothing 
    - look at listcomponent and make a new one
 - TODO:
    - [DONE?] move sections to their own file
    - [DONE] Separate Dialog from Dialog Content (pass them in as children)
    - [DONE] Move Dialogs into return
    - [DONE] dont use var
    - [DONE] fix eslint errors
    - [DONE, bc we got rid of button in SectionList] make own list component
*/
