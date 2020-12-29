import React from 'react';

// import history from 'utils/history';

// import Container from 'layout/Container';
// import Redirect from 'components/Redirect';
// import { get } from 'utils/storage';
import { addRoutes } from './utils';

addRoutes([
    {
        path: '/admin',
        action: (ctx) => {
            return <h1>Hello World</h1>;
        },
    },
]);
