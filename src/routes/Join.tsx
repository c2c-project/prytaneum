import React from 'react';

import Page from 'layout/Page';
import TownhallProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallLive from 'domains/Townhall/TownhallLive';
import RequireLogin from 'components/RequireLogin';
import { addRoutes } from './utils';

addRoutes([
    {
        path: '/join',
        action: (ctx) => {
            // TODO: verify/login user here
            // user context here too
            return (
                <RequireLogin>
                    <Page maxWidth='xl'>{ctx.next()}</Page>
                </RequireLogin>
            );
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    const { townhallId } = ctx.params as { townhallId: string };

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
