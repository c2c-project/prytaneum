import React from 'react';
import PropTypes from 'prop-types';

import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core';

export interface Props {
    primary: string;
    secondary?: string;
    avatar?: string;
}
// FIXME:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListCell = ({ primary, secondary, avatar }: Props) => {
    return (
        <li>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
            </ListItem>
        </li>
    );
};

ListCell.defaultProps = {
    secondary: '',
    avatar: '',
};

ListCell.propTypes = {
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
    avatar: PropTypes.string,
};

export default ListCell;
