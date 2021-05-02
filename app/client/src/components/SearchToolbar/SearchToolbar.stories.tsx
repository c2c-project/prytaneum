import * as React from 'react';

import SearchToolbar from './SearchToolbar';

export default { title: '@local/components/SearchToolbar' };

export function Primary() {
    return <SearchToolbar onChange={() => {}} label='Search Users' />;
}
