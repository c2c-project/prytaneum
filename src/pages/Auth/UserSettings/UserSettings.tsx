import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from 'components/Paper';
import Dialog from 'components/Dialog';
import AppBar from 'layout/AppBar';
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

/**
 * Displays the settings for User, using SettingsMenu, it displays the User information like first name, last name, username, email and obfuscated password, so they can change it. To be pulled and pushed from/to database later <br/></br>
 * It also displays options for appearing anonymously, notifcations for upcoming townhalls, darkmode and color scheme (like material UIs website) <br/></br>
 * Account settings shows an option to logout, disable or delete account, each one opens a dialog box, see components/dialog
 * Information is info about us, feedback, ToS and privacy policy
 * @category Auth
 * @constructor UserSettings
 * @param Props
 * @param {string} id id of the container for testing if it exists or styling. Also just for general specification of the element
 */
export default function UserSettings({ id }: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cont, setContent] = React.useState<JSX.Element | null>(null);

    React.useEffect(() => {
        if (cont !== null) setOpen(true);
        if (cont === null) setOpen(false);
    }, [cont]);

    const dialogData = [
        { text: Options().title, component: Options().dialogData },
        {
            text: AccountSettings().title,
            component: AccountSettings().dialogData,
        },
        { text: Information().title, component: Information().dialogData },
    ];

    const optionsDialog = () => {
        return dialogData[0].component.map(({ text, component }) => (
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
    const accountSettingsDialog = () => {
        return dialogData[1].component.map(({ text, component }) => (
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
    const infoDialog = () => {
        return dialogData[2].component.map(({ text, component }) => (
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
            content: UserProfile().content,
        },
        {
            title: Options().title,
            content: optionsDialog(),
        },
        {
            title: AccountSettings().title,
            content: accountSettingsDialog(),
        },
        {
            title: Information().title,
            content: infoDialog(),
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
                <Dialog open={open} onClose={() => setContent(null)}>
                    {cont || <div />}
                </Dialog>
            </Paper>
        </Container>
    );
}

UserSettings.defaultProps = {
    id: 'UserSettings',
};
