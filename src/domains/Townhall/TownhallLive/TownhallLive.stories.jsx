import React from 'react';
import Component from './TownhallLive';
import TownhallProvider from '../Contexts/Townhall';

export default { title: 'Domains/Townhall' };

export function TownhallLive() {
    return (
        <TownhallProvider townhallId='1234'>
            <Component />
        </TownhallProvider>
    );
}
