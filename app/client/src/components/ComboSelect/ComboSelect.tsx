/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextField, Checkbox } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    '@keyframes grow': {
        from: { transform: 'scale(0%)' },
        to: { transform: 'scale(100%)' },
    },
    checkBoxIcon: {
        marginRight: theme.spacing(1),
    },
    TextField: {
        width: '100%',
    },
    chip: {
        animation: '$grow 200ms',
    },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export interface Props {
    options: Array<string>;
    selectedFilter: Array<string>;
    onChange: (
        event: React.ChangeEvent<unknown>,
        value: string[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined
    ) => void;
    label: string;
}

const ComboSelect = ({ options, onChange, selectedFilter, label }: Props) => {
    const selectedSet = React.useMemo(() => new Set(selectedFilter), [selectedFilter]);
    const classes = useStyles();

    return (
        <Autocomplete
            multiple
            id='checkboxes-tags-demo'
            options={options}
            // TODO: there's no exit animation, but w/e for now -- very low prio
            classes={{ tag: classes.chip }}
            disableCloseOnSelect
            defaultValue={selectedFilter}
            getOptionLabel={(option: string) => option}
            // FIXME: potentially broken here from mui v5 migration
            renderOption={(_, option: string) => (
                <>
                    <Checkbox
                        className={classes.checkBoxIcon}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={selectedSet.has(option)}
                    />
                    {option}
                </>
            )}
            className={classes.TextField}
            renderInput={(params) => (
                <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    variant='outlined'
                    label={label}
                />
            )}
            onChange={onChange}
        />
    );
};

ComboSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ComboSelect;
