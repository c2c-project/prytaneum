/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, {
    AutocompleteRenderOptionState,
} from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { TextField, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    checkBoxIcon: {
        marginRight: theme.spacing(1),
    },
    TextField: {
        width: '100%',
    },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export interface Props {
    options: Array<string>;
    selectedFilter: Array<string>;
    onChange: () => void;
}

const CheckBox = ({ options, onChange, selectedFilter }: Props) => {
    const classes = useStyles();
    return (
        <Autocomplete
            multiple
            id='checkboxes-tags-demo'
            options={options}
            disableCloseOnSelect
            defaultValue={selectedFilter}
            getOptionLabel={(option: string) => {
                return option;
            }}
            renderOption={(option: string) => (
                <>
                    <Checkbox
                        className={classes.checkBoxIcon}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        checked={selectedFilter.includes(option)}
                    />
                    {option}
                </>
            )}
            // style={{ width: 500 }}
            className={classes.TextField}
            renderInput={(params) => (
                <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    variant='outlined'
                    label='Status tags'
                />
            )}
            onChange={onChange}
        />
    );
};

CheckBox.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CheckBox;
