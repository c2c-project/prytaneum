import React from 'react';

import CheckBox from './CheckBox';

export default { title: 'Components/CheckBox' };

const statusTags = ['admin', 'moderator', 'organizer', 'regular', 'banned'];

export function Primary() {
    return (
        <CheckBox
            options={statusTags}
            onChange={() => {}}
            selectedFilter={[]}
        />
    );
}
