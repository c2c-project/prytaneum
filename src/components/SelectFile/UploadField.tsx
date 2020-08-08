/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

function UploadField({
    onChange,
    fileName,
}: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    onChange: Function;
    fileName?: string;
}) {
    const classes = useStyles();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { files } = e.target;
        if (files && files.length > 0) {
            onChange(files.item(0));
        }
    };
    // NOTE: must have this b/c if state changes type something weird happens
    return (
        <Grid container alignItems='center'>
            <Grid item xs='auto'>
                <TextField
                    className={classes.textField}
                    variant='filled'
                    value={fileName}
                    label='Chosen File'
                    placeholder='No File Chosen'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <input
                accept='.csv'
                className={classes.input}
                id='contained-button-file'
                type='file'
                onChange={handleChange}
            />
            <Grid item xs='auto'>
                <label htmlFor='contained-button-file'>
                    <Button
                        variant='outlined'
                        component='span'
                        color='secondary'
                        className={classes.button}
                    >
                        Select File
                    </Button>
                </label>
            </Grid>
        </Grid>
    );
}

UploadField.defaultProps = {
    fileName: '',
};

UploadField.propTypes = {
    onChange: PropTypes.func.isRequired,
    fileName: PropTypes.string,
};

export default UploadField;
