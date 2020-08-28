/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    image: {
        width: 100,
        height: 100,
    },
    typographySpacing: {
        marginLeft: theme.spacing(3),
    },
}));

export interface Props {
    profileInfo: {
        primary: string;
        info: Array<{
            status: string;
            count: number;
        }>;
    };
}

const UserInfo = ({ profileInfo }: Props) => {
    const classes = useStyles();

    const formatedInfo = profileInfo.info.map((row) => {
        return (
            <Typography className={classes.typographySpacing}>
                {row.status}:{row.count}
            </Typography>
        );
    });
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Avatar className={classes.image} />
            </Grid>
            <Grid item>
                <Typography variant='body1'>{profileInfo.primary}</Typography>
                {formatedInfo}
            </Grid>
        </Grid>
    );
};

UserInfo.propTypes = {
    profileInfo: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        info: PropTypes.arrayOf(
            PropTypes.shape({
                status: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            }).isRequired
        ),
    }).isRequired,
};

export default UserInfo;
