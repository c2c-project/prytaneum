import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';

import Component from './IconBar';

export default { title: 'Icon Bar' };

export function CenterIconBar() {
    return (
        <Component justify='center'>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
        </Component>
    );
}

export function TopIconBar() {
    return (
        <Component justify='flex-start'>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
        </Component>
    );
}

export function IconBarFooter() {
    return (
        <Component justify='flex-end'>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <TownhallIcon />
            </div>
        </Component>
    );
}
