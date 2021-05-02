import * as React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';

import Component from './IconBar';

export default { title: '@local/components/Icon Bar' };

export function Basic() {
    return (
        <Component>
            <TownhallIcon />
            <SettingsIcon />
            <TownhallIcon />
        </Component>
    );
}
