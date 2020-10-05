import React from 'react';

import SearchToolbar from './SearchToolbar';

export default { title: 'Components/SearchToolbar' };

export function Primary() {
    return <SearchToolbar onChange={() => {}} label='Search Users' />;
}
