import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';
import SectionList from 'components/SectionList';

import UserProfile from 'components/UserProfile';
import Options from 'components/Options';
import AccountSettings from 'components/AccountSettings';
import Information from 'components/Information';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    grid: {
        height: '125%',
    },
    paper: {
        padding: theme.spacing(2),
        alignItems: 'top',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        listStyle: 'none',
    },
}));

export default function UserSettings() {
    const classes = useStyles();

    const openStateArr: {
        s: [
            string,
            JSX.Element,
            boolean,
            React.Dispatch<React.SetStateAction<boolean>>
        ];
    }[] = [
        { s: Options().dialogData[0] },
        { s: AccountSettings().dialogData[0] },
        { s: AccountSettings().dialogData[1] },
        { s: AccountSettings().dialogData[2] },
        { s: Information().dialogData[0] },
        { s: Information().dialogData[1] },
        { s: Information().dialogData[2] },
        { s: Information().dialogData[3] },
    ];

    const sections = [
        {
            title: UserProfile().title,
            sectionData: UserProfile().sectionData,
        },
        {
            title: Options().title,
            sectionData: Options().sectionData,
        },
        {
            title: AccountSettings().title,
            sectionData: AccountSettings().sectionData,
        },
        {
            title: Information().title,
            sectionData: Information().sectionData,
        },
    ];

    return (
        <Container
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
                <SectionList sections={sections} />
                {openStateArr.map(({ s }) => (
                    <Dialog
                        open={s[2]}
                        title={s[0]}
                        onClose={() => s[3](false)}
                    >
                        {s[1]}
                    </Dialog>
                ))}
            </Paper>
        </Container>
    );
}

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
