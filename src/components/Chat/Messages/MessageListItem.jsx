import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    message: {
        width: '100%',
    },
});



export default function MessageListItem({ button, onClick, children, hidden }) {
    const classes = useStyles();
    // const isOwnerOrModerator = moderator || checkIsOwner(user, userId);
    return (
        <ListItem
            hidden={hidden}
            // If user is moderator on the owner of the message then this ListItem is rendered as a button
            button={button}
            // If user is moderator on the owner of the message then this ListItem's onClick event calls setTargetMsg
            onClick={(button || undefined) && onClick}
            className={classes.message}
        >
            <Grid container>
                {React.Children.map(children, (child) => (
                    <Grid item xs='auto'>
                        {child}
                    </Grid>
                ))}
            </Grid>
        </ListItem>
    );
}

MessageListItem.defaultProps = {
    onClick: () => {},
    button: false,
    hidden: false,
};

MessageListItem.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    onClick: PropTypes.func,
    button: PropTypes.bool,
    hidden: PropTypes.bool,
};