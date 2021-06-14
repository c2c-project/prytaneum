import * as React from 'react';
import { makeUser } from 'prytaneum-typings';

import Component from './SideNav';

export default { title: 'layout/SideNav' };

export function Basic() {
    return <Component user={makeUser()} />;
}
