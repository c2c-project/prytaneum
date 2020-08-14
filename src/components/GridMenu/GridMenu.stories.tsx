/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';

import { DeviceContext } from 'contexts/Device';

import Component, { Props as GridMenuProps } from './GridMenu';

export default {
    title: 'Components/Grid Menu',
    component: Component,
    argTypes: {
        DeviceType: {
            control: {
                type: 'select',
                options: ['desktop', 'mobile'],
            },
        },
        btnCols: {
            control: {
                type: 'number',
                min: 1,
                max: 12,
            },
        },
    },
};

interface Props extends GridMenuProps {
    DeviceType: 'desktop' | 'mobile';
}

export function GridMenu({ DeviceType, btnCols }: Props) {
    return (
        <DeviceContext.Provider value={DeviceType}>
            <Component btnCols={btnCols}>
                <Button startIcon={<TownhallIcon />}>Townhalls</Button>
                <Button startIcon={<SettingsIcon />}>Settings</Button>
                <Button>asdf</Button>
                <Button>asdf</Button>
            </Component>
        </DeviceContext.Provider>
    );
}

// export function GridMenuDefault() {
//     return (
//         <GridMenu>
//             <Button startIcon={<TownhallIcon />}>Townhalls</Button>
//             <Button startIcon={<SettingsIcon />}>Settings</Button>
//             <Button>asdf</Button>
//             <Button>asdf</Button>
//         </GridMenu>
//     );
// }

// export function GridMenuOverride({ btnCols }: Props) {
//     return (
//         <GridMenu btnCols={btnCols}>
//             <Button startIcon={<TownhallIcon />}>Townhalls</Button>
//             <Button startIcon={<SettingsIcon />}>Settings</Button>
//             <Button>asdf</Button>
//             <Button>asdf</Button>
//         </GridMenu>
//     );
// }
