import React from 'react';
import {
    Card,
    CardContent,
    Collapse,
    CardHeader,
    Grid,
    Button,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import type { Roles } from 'prytaneum-typings';

import Select from 'components/Select';
import CopyText from 'components/CopyText';
import LoadingButton from 'components/LoadingButton';
import useEndpoint from 'hooks/useEndpoint';
import api from '../api';

const useStyles = makeStyles((theme: Theme) => ({
    cardContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexFlow: 'row wrap',
    },
    btn: {
        margin: theme.spacing(2, 0),
    },
    link: {
        alignSelf: 'center',
    },
    text: {
        fontSize: '1.3em',
    },
    textContainer: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));

/**
 * Widget to be used on admin dashboard, expects to the user to
 * have already been verified as an admin
 */
export default function RoleInvite() {
    // styles
    const classes = useStyles();

    // currently selected role and link
    const [role, setRole] = React.useState<Roles>('organizer');
    const [link, setLink] = React.useState('');

    // endpont
    const endpoint = React.useCallback(() => api.generateLink(role), [role]);
    const [run, isLoading] = useEndpoint(endpoint, {
        onSuccess: ({ data }) =>
            setLink(`${window.origin}/register?invite=${data.token}`),
    });
    return (
        <Card>
            <CardHeader
                title='Invite by role'
                subheader='The generated link may be used one time.'
            />
            <CardContent className={classes.cardContent}>
                <Grid item xs={12}>
                    <Select
                        label='Select Role...'
                        options={['admin', 'organizer'] as Roles[]}
                        onChange={(e) => {
                            const { value } = e.target;
                            setRole(value as Roles);
                        }}
                        value={role}
                    />
                </Grid>
                <LoadingButton loading={isLoading}>
                    <Button
                        className={classes.btn}
                        onClick={run}
                        variant='outlined'
                    >
                        Make Invite
                    </Button>
                </LoadingButton>
                <Grid item container justify='center' xs={12}>
                    <Collapse in={Boolean(link)}>
                        <CopyText
                            TextFieldProps={{ label: 'Invite Link' }}
                            className={classes.text}
                            text={link}
                        />
                    </Collapse>
                </Grid>
            </CardContent>
        </Card>
    );
}
