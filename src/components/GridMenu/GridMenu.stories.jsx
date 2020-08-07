import React from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';
import { withKnobs, select } from '@storybook/addon-knobs';

import { DeviceContext } from 'contexts/Device';

import GridMenu from './GridMenu';

export default { title: 'Components', decorators: [withKnobs] };

export function GridMenuNormal() {
    return (
        <DeviceContext.Provider
            value={select('DeviceType', ['desktop', 'mobile'], 'desktop')}
        >
            <GridMenu>
                <Button startIcon={<TownhallIcon />}>Townhalls</Button>
                <Button startIcon={<SettingsIcon />}>Settings</Button>
                <Button>asdf</Button>
                <Button>asdf</Button>
            </GridMenu>
        </DeviceContext.Provider>
    );
}

export function GridMenuDefault() {
    return (
        <GridMenu>
            <Button startIcon={<TownhallIcon />}>Townhalls</Button>
            <Button startIcon={<SettingsIcon />}>Settings</Button>
            <Button>asdf</Button>
            <Button>asdf</Button>
        </GridMenu>
    );
}

export function GridMenuOverride() {
    return (
        <GridMenu btnCols={12}>
            <Button startIcon={<TownhallIcon />}>Townhalls</Button>
            <Button startIcon={<SettingsIcon />}>Settings</Button>
            <Button>asdf</Button>
            <Button>asdf</Button>
        </GridMenu>
    );
}
