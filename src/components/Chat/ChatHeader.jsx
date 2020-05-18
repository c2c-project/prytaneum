import React from 'react';
import PropTypes from 'prop-types';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function ChatHeader({ title, actions }) {
    return (
        <Grid container item xs={12}>
            <Typography variant='h4'>{title}</Typography>
            {actions}
        </Grid>
    );
}

ChatHeader.propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.node).isRequired,
};
