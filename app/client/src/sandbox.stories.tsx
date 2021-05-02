import React from 'react';
import { Meta } from '@storybook/react';

export default { title: 'Sandbox' } as Meta;

function Component() {
    return <div>hello world</div>;
}

export function Sandbox() {
    return <Component />;
}
