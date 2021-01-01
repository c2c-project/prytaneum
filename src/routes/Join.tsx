import React from 'react';

import TownhallProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallLive from 'domains/Townhall/TownhallLive';
import RequireLogin from 'components/RequireLogin';
import Redirect from 'components/Redirect';
import { addRoutes, areParamsValid } from './utils';

// TODO: handle invite logic here, for now it's just public
addRoutes([
    {
        path: '/join',
        action: (ctx) => <RequireLogin>{ctx.next()}</RequireLogin>,
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    if (!areParamsValid(ctx.params, ['townhallId']))
                        return <Redirect href='/logout' />;

                    const { townhallId } = ctx.params;
                    return (
                        <TownhallProvider townhallId={townhallId}>
                            <TownhallLive />
                        </TownhallProvider>
                    );
                },
            },
        ],
    },
]);
