import * as React from 'react';
import faker from 'faker/locale/en';

import Component from './Help';

export default { title: '@local/components/Help' };

export function Basic() {
    return <Component>{faker.lorem.lines()}</Component>;
}
