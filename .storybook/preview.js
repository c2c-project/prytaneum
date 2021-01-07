import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';
import { withPerformance } from 'storybook-addon-performance';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
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
                    <AnimatePresence>{storyFn()}</AnimatePresence>
                </DeviceContext>
            </SnackContext>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
));

addDecorator(withPerformance);
addParameters({
    a11y: {
        element: '#root',
        config: {},
        options: {},
        manual: true,
    },
});
