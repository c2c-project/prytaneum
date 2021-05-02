import * as React from 'react';
import { Meta } from '@storybook/react';

import ComboSelect from './ComboSelect';

export default { title: '@local/components/Combo Select', parameters: { layout: 'centered' } } as Meta;

const statusTags = ['admin', 'moderator', 'organizer', 'regular', 'banned'];

export function Primary() {
    const [state, setState] = React.useState<string[]>([]);
    return (
        <ComboSelect
            options={statusTags}
            onChange={(e, value) => setState(value)}
            selectedFilter={state}
            label='Status Tags'
        />
    );
}
