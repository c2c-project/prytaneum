import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import isChromatic from 'chromatic/isChromatic';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import SnackContext from '../src/contexts/Snack';
import ThemeProvider from '../src/contexts/Theme';
import rootReducer from '../src/reducers';
import './main.css';

if (typeof global.process === 'undefined' && !isChromatic()) {
    const { worker } = require('../src/mock/browser');

    // Start the mocking when each story is loaded.
    // Repetitive calls to the `.start()` method do not register a new worker,
    // but check whether there's an existing once, reusing it, if so.
    worker.start({
        // serviceWorker: {
        //     options: {
        //         scope: '/api',
        //     },
        // },
    });
}

const store = createStore(rootReducer);

addDecorator((storyFn) => (
    <ThemeProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />
            <Provider store={store}>
                <SnackContext maxSnack={1}>{storyFn()}</SnackContext>
            </Provider>
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

export const parameters = {
    layout: 'fullscreen',
    chromatic: { disable: true },
};
