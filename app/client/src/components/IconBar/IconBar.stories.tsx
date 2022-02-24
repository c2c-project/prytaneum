import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import TownhallIcon from '@mui/icons-material/AccountBalance';

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
