import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import useEndpoint from 'hooks/useEndpoint';
import axios from 'axios';
import _ from 'lodash';

export default function MoCDropdown() {
    const MIN_CHARS = 3;

    const MIN_WAIT_TIME = 2000;

    const endpoint = () => {}; // normally be useEndpoint hook here

    const [handle, setHandle] = React.useState<NodeJS.Timeout | null>(null);

    const [input, setInput] = React.useState('');
    const [data2, setData2] = React.useState([]);
    const url =
        'https://api.propublica.org/congress/v1/116/senate/members.json';
    axios
        .get(url, {
            headers: {
                'X-API-Key': process.env.REACT_APP_API_KEY,
            },
        })
        .then((response) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            setData2(response.data.results[0].members);
        })
        .catch((error) => {
            console.log(error);
        });

    const startCountdown = () => setHandle(setTimeout(endpoint, MIN_WAIT_TIME));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { value } = e.target;

        setInput(value);

        if (handle) {
            clearTimeout(handle);
        }

        if (input.length > MIN_CHARS) {
            startCountdown();
        }
    };

    const handleSearch = () => console.log('hello there');
    return (
        <div>
            <Autocomplete
                id='combo-box-demo'
                options={data2}
                getOptionLabel={(option) => option.first_name}
                style={{ width: 300 }}
                onUpdateInput={handleSearch}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='outlined'
                        label='type here'
                        onChange={handleChange}
                        value={input}
                    />
                )}
            />
        </div>
    );
}
