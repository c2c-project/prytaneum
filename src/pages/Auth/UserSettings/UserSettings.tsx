import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';
import SectionList from 'components/SectionList';

import UserProfile from './UserProfile';
import { Options, AppearanceState } from './Options';
import { AccountSettings, AccountSettingsState } from './AccountSettings';
import { Information, InformationState  } from './Information';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    paper: {
        // not necessary anymore?
        // marginTop: '64-px', // slight offset to make the component feel more vertically centered
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
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
        {s: AppearanceState()},
        {s: AccountSettingsState()[0]},
        {s: AccountSettingsState()[1]},
        {s: AccountSettingsState()[2]},
        {s: InformationState()[0]},
        {s: InformationState()[1]},
        {s: InformationState()[2]},
        {s: InformationState()[3]},
    ];
        
    const sections = [
        {
            title: UserProfile().title,
            sectionData: UserProfile().sectionData,
        },
        {
            title: Options.title,
            sectionData: Options.sectionData,
        },
        {
            title: AccountSettings.title,
            sectionData: AccountSettings.sectionData,
        },
        {
            title: Information.title,
            sectionData: Information.sectionData,
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
    - move sections to their own file
    - [DONE] Separate Dialog from Dialog Content (pass them in as children)
    - [DONE] Move Dialogs into return
    - [DONE] dont use var
    - [DONE] fix eslint errors
    - [DONE, bc we got rid of button in SectionList] make own list component
*/
