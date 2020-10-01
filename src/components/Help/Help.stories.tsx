import React from 'react';
import faker from 'faker';

import Component from './Help';

export default { title: 'Components/Help' };

export function Basic() {
    return <Component>{faker.lorem.lines()}</Component>;
}
