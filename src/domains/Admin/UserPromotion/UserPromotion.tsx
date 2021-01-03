/* eslint-disable */ // FIXME:
// TODO: change to use components/SettingsItem & components/SettingsList
import React from 'react';
import PropTypes from 'prop-types';
import type { User, Roles } from 'prytaneum-typings';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, Switch, Typography } from '@material-ui/core';

import useEndpoint from 'hooks/useEndpoint';
import { promoteUser } from 'domains/Admin/api/api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
}));

interface Props {
    promotionOptions: Roles[];
    user: User;
    onChange?: () => void;
}

const UserPromotion = ({ promotionOptions, user, onChange: cb }: Props) => {
    const classes = useStyles();
    // const [user, setUser] = useState<User>(user);
    console.log(user);
    const [post] = useEndpoint(() => promoteUser(user, user._id), {
        onSuccess: cb,
    });

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const copyUser = user;
        const newStatus = user.roles.map((role) => {
            if (role === name) {
                return {
                    ...user.roles,
                    role,
                };
            }
            return user.roles;
        });

        const updatedUser = { ...copyUser, status: newStatus };
        // setUser(updatedUser);
        post();
    };

    const switches = promotionOptions.map((role) => {
        return (
            <Grid container item key={role} spacing={2} alignContent='center'>
                <Grid item xs={10}>
                    <Typography>{role}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Switch
                        checked={user.roles.includes(role)}
                        onChange={onChangeHandler}
                        name={role}
                    />
                </Grid>
            </Grid>
        );
    });

    return (
        <Grid
            container
            direction='column'
            className={classes.root}
            alignContent='center'
            justify='center'
        >
            {switches}
        </Grid>
    );
};

UserPromotion.defaultProps = {
    promotionOptions: ['Admin', 'Organizer'],
    onChange: () => {},
};

UserPromotion.propTypes = {
    promotionOptions: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

export default UserPromotion;
