import React from 'react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TownhallIcon from '@material-ui/icons/AccountBalance';
import { makeStyles } from '@material-ui/core/styles';

import { DeviceContext } from 'contexts/Device';

import GridMenu from './GridMenu';

export default { title: 'Grid Menu' };

const useStyles = makeStyles({
    btn: {
        color: 'red',
    },
});

export function GridMenuDesktop() {
    const classes = useStyles();
    return (
        <DeviceContext.Provider value='desktop'>
            <GridMenu>
                <Button className={classes.btn} startIcon={<TownhallIcon />}>
                    Townhalls
                </Button>
                <Button startIcon={<SettingsIcon />}>Settings</Button>
                <Button>asdf</Button>
                <Button>asdf</Button>
            </GridMenu>
        </DeviceContext.Provider>
    );
}

export function GridMenuMobile() {
    return (
        <DeviceContext.Provider value='mobile'>
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
