import React from 'react';

import Component from './ResponsiveDialog';

export default { title: 'Components/Responsive Dialog', component: Component };

export function Dialog() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <button type='button' onClick={() => setOpen(true)}>
                Open Dialog
            </button>
            <Component open={open} onClose={() => setOpen(false)}>
                <h1>hello world</h1>
            </Component>
        </div>
    );
}
