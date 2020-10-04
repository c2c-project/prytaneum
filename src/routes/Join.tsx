import React from 'react';

import { addRoutes } from './utils';

addRoutes([
    {
        path: '/join',
        action: (ctx) => {
            // TODO: verify/login user here
            // user context here too
            return ctx.next();
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    // TODO: wrap in townhall context here
                    return <div />;
                },
            },
        ],
    },
]);
