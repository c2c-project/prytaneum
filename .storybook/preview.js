import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import UserContext from '../src/contexts/User';
import SnackContext from '../src/contexts/Snack';
import ThemeProvider from '../src/contexts/Theme';
import DeviceContext from '../src/contexts/Device';
import './main.css';

if (typeof global.process === 'undefined') {
    const { worker } = require('../src/mock/browser');

    // Start the mocking when each story is loaded.
    // Repetitive calls to the `.start()` method do not register a new worker,
    // but check whether there's an existing once, reusing it, if so.
    worker.start();
}

addDecorator((storyFn) => (
    <ThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <SnackContext maxSnack={1}>
                <DeviceContext>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        {storyFn()}
                    </div>
                </DeviceContext>
            </SnackContext>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
));

addParameters({
    a11y: {
        element: '#root',
        config: {},
        options: {},
        manual: true,
    },
});
