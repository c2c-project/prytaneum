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

interface Props {
    button: boolean;
    onClick: () => void;
    children: JSX.Element | JSX.Element[];
    hidden: boolean;
}

export default function MessageListItem(props: Props) {
    const { button, onClick, children, hidden } = props;
    const classes = useStyles();
    // const isOwnerOrModerator = moderator || checkIsOwner(user, userId);
    return (
        <ListItem
            hidden={hidden}
            // If user is moderator on the owner of the message then this ListItem is rendered as a button
            // https://github.com/mui-org/material-ui/issues/14971
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            button={button as any}
            // If user is moderator on the owner of the message then this ListItem's onClick event calls setTargetMsg
            onClick={button ? onClick : undefined}
            className={classes.message}
        >
            <Grid container spacing={1}>
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
