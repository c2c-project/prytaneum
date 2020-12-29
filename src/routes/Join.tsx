import React from 'react';

import Container from 'layout/Container';
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
                    <Container maxWidth='xl'>{ctx.next()}</Container>
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
