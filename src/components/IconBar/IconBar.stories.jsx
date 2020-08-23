import React from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';

import { DeviceContext } from 'contexts/Device';

import GridMenu from './IconBar';

export default { title: 'Icon Bar' };

export function CenterIconBar() {
    return (
        <GridMenu alignBar={'center'}>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
        </GridMenu>
    );
}

export function TopIconBar() {
    return (
        <GridMenu alignBar={'flex-start'}>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
        </GridMenu>
    );
}

export function IconBarFooter() {
    return (
        <GridMenu alignBar={'flex-end'}>
            <div>
                <TownhallIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
            <div>
                <SettingsIcon />
            </div>
        </GridMenu>
    );
}
