import React from 'react';
import useEndpoint from 'hooks/useEndpoint';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);

export default function MoCDropdown() {



    const classes = useStyles();
    const [chamber, setChamber] = React.useState('');
    const [input, setInput] = React.useState('');
    const [data2, setData2] = React.useState([]);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setChamber(event.target.value as string);
        const url =
            'https://api.propublica.org/congress/v1/116/' +
            event.target.value +
            '/members.json';
        axios
            .get(url, {
                headers: {
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                },
            })
            .then((response) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                console.log(response);
                setData2(response.data.results[0].members);
            })
            .catch((error) => {
                console.log(error);
            });
    };

   

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-helper-label'>
                    Chamber
                </InputLabel>
                <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={chamber}
                    onChange={handleChange}
                >
                    <MenuItem value={'House'}>House</MenuItem>
                    <MenuItem value={'Senate'}>Senate</MenuItem>
                </Select>
                <FormHelperText>Select a chamber</FormHelperText>
            </FormControl>

            <Autocomplete
                id='combo-box-demo'
                options={data2}
                getOptionLabel={(option) => option.first_name + " " + option.last_name}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='outlined'
                        label='type here'
                        value={input}
                    />
                )}
            />
        </div>
    );
}
