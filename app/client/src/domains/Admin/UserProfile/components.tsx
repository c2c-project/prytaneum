/* eslint-disable */ // FIXME:
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@material-ui/core';
import type { User } from 'prytaneum-typings';

import { formatDate } from 'utils/format';
import SettingsItem from 'components/SettingsItem';
import SettingsList from 'components/SettingsList';

const useMiniStyles = makeStyles((theme) => ({
    image: {
        width: 100,
        height: 100,
    },
    typographySpacing: {
        marginLeft: theme.spacing(3),
    },
}));

export function MiniProfile({ name }: { name: string }) {
    const classes = useMiniStyles();
    return (
        <Grid container spacing={2} direction='column' alignItems='center'>
            <Grid item xs='auto'>
                <Avatar className={classes.image} />
            </Grid>
            <Grid item xs='auto'>
                <Typography variant='body1'>{name}</Typography>
            </Grid>
        </Grid>
    );
}

MiniProfile.propTypes = {
    name: PropTypes.string.isRequired,
};

interface TagProps {
    tags: string[];
    emptyMessage?: string;
}

const useTagStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export function Tags({ tags, emptyMessage }: TagProps) {
    const classes = useTagStyles();
    let structuredTags = null;
    if (tags.length === 0) {
        structuredTags = <Typography>{emptyMessage}</Typography>;
    } else {
        structuredTags = tags.map((tag) => {
            return <Chip key={tag} color='primary' size='small' label={tag} />;
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item className={classes.chips} xs={12}>
                {structuredTags}
            </Grid>
        </Grid>
    );
}

Tags.defaultProps = {
    emptyMessage: 'User does not contain tags',
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    emptyMessage: PropTypes.string,
};

// FIXME:
// export type UserHistoryProps = Pick<User, 'history'>;

// export function UserHistory({ history }: UserHistoryProps) {
//     return (
//         <SettingsList>
//             <List dense>
//                 {history.actions
//                     .slice(0, 5)
//                     .map(({ action, timestamp }, idx) => (
//                         <ListItem key={idx}>
//                             <ListItemText
//                                 primary={action}
//                                 secondary={formatDate(timestamp, 'P p')}
//                             />
//                         </ListItem>
//                     ))}
//             </List>
//             <List dense>
//                 {history.townhall.slice(0, 5).map(({ title, tags }, idx) => (
//                     <ListItem key={idx}>
//                         <ListItemText primary={title} secondary={tags} />
//                     </ListItem>
//                 ))}
//             </List>
//         </SettingsList>
//     );
// }

export function AccountActions() {
    const theme = useTheme();
    return (
        <SettingsList>
            <SettingsItem
                helpText='This will disable this account, email, and ip address'
                name='Ban Account'
            >
                <Button
                    variant='contained'
                    style={{
                        backgroundColor: theme.palette.error.main,
                        color: theme.palette.error.contrastText,
                    }}
                >
                    Ban
                </Button>
            </SettingsItem>
            <SettingsItem helpText='Delete the account' name='Delete Account'>
                <Button
                    variant='contained'
                    style={{
                        backgroundColor: theme.palette.error.main,
                        color: theme.palette.error.contrastText,
                    }}
                >
                    Delete
                </Button>
            </SettingsItem>
        </SettingsList>
    );
}
