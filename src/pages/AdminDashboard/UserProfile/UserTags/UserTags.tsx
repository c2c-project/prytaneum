import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export interface Props {
    tags: string[];
    primaryHeader: string;
    emptyMessage?: string;
}

const UserTags = ({ tags, primaryHeader, emptyMessage }: Props) => {
    const classes = useStyles();
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
            <Grid item xs={12}>
                <Typography>{primaryHeader}</Typography>
            </Grid>
            <Grid item className={classes.chips} xs={12}>
                {structuredTags}
            </Grid>
        </Grid>
    );
};

UserTags.defaultProps = {
    emptyMessage: 'User does not contain tags',
};

UserTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    primaryHeader: PropTypes.string.isRequired,
    emptyMessage: PropTypes.string,
};

export default UserTags;
