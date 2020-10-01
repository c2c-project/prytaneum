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
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
    },
}));

interface RequiredProps {
    onChange: (f: File) => void;
}

interface DefaultProps {
    fileName?: string;
}

function UploadField({ onChange, fileName }: RequiredProps & DefaultProps) {
    const classes = useStyles();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { files } = e.target;
        if (files && files.length > 0) {
            onChange(files.item(0) as File);
        }
    };
    // NOTE: must have this b/c if state changes type something weird happens
    return (
        <Grid container alignItems='center'>
            <Grid item xs='auto'>
                <label htmlFor='chosen-file'>
                    <TextField
                        className={classes.textField}
                        variant='outlined'
                        color='primary'
                        value={fileName}
                        label='Chosen File'
                        placeholder='No File Chosen'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </label>
            </Grid>
            <label htmlFor='selected-file'>
                <input
                    accept='.csv'
                    className={classes.input}
                    id='contained-button-file'
                    type='file'
                    onChange={handleChange}
                />
            </label>
            <Grid item xs='auto'>
                <label htmlFor='contained-button-file'>
                    <Button
                        variant='outlined'
                        component='span'
                        color='primary'
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
