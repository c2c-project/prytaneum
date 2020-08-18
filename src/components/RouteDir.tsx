/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useRouteMatch, RouteProps } from 'react-router-dom';

import RouteDirContext from 'contexts/RouteDir';
import RouteFile from './RouteFile';

export default function RouteDir(props: RouteProps & { path: string }) {
    // const { path } = props;
    const match = useRouteMatch();
    // console.log('context update');
    return (
        <RouteDirContext.Provider value={match.url}>
            <RouteFile {...props} exact={false} />
        </RouteDirContext.Provider>
    );
}
