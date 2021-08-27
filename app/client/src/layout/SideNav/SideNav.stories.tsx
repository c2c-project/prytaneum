import * as React from 'react';
import { makeUser } from 'prytaneum-typings';

import { SideNav as Component} from './SideNav';

export default { title: 'layout/SideNav' };

export function Basic() {
    return <Component isHidden={false} isOpen={true} close={() => {}} />;
}
