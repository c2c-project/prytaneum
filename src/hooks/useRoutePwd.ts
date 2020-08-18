import React from 'react';
import RouteDirContext from 'contexts/RouteDir';

export default function useRoutePwd() {
    const pwd = React.useContext(RouteDirContext);

    return [pwd];
}
