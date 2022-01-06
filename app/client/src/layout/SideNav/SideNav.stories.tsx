import * as React from 'react';

import { SideNav as Component} from './SideNav';

export default { title: 'layout/SideNav' };

export function Basic() {
    return <Component isHidden={false} isOpen close={() => {}} />;
}
