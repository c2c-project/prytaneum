import React from 'react';
import ReactDOM from 'react-dom';

import smoothscroll from 'smoothscroll-polyfill';
import { init } from 'utils/storage';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

smoothscroll.polyfill();

function startup() {
    init(); // initializes local storage
    ReactDOM.render(React.createElement(App), document.getElementById('root'));
}

if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_MSW === 'true'
) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, global-require
    const { worker } = require('mock/browser');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    worker
        .start()
        .then(() => startup())
        // eslint-disable-next-line no-console
        .catch(console.error);
} else {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA

    // serviceWorker.unregister();

    serviceWorker.register();
    startup();
}
