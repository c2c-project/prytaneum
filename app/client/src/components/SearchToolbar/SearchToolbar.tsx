import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { TextField } from '@local/components/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '12px',
        // flexBasis: 420,
        margin: theme.spacing(1),
    },
    icon: {
        alignSelf: 'center',
    },
}));

export interface Props {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    label: string;
}

const SearchToolbar = ({ onChange, label }: Props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <TextField
                // disableUnderline
                onChange={onChange}
                label={label}
            />
            <SearchIcon className={classes.icon} aria-label='SearchIcon' />
        </Paper>
    );
};

SearchToolbar.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default SearchToolbar;
