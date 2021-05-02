import * as React from 'react';
import Container from '@material-ui/core/Container';

import Component, { PieDatum } from './PieChart';

export default { title: '@local/components/Pie Chart' };

const Nivo: PieDatum[] = [
    {
        id: 'php',
        label: 'php',
        value: 344,
        color: 'hsl(312, 70%, 50%)',
    },
    {
        id: 'go',
        label: 'go',
        value: 262,
        color: 'hsl(244, 70%, 50%)',
    },
    {
        id: 'javascript',
        label: 'javascript',
        value: 411,
        color: 'hsl(320, 70%, 50%)',
    },
    {
        id: 'ruby',
        label: 'ruby',
        value: 191,
        color: 'hsl(305, 70%, 50%)',
    },
    {
        id: 'hack',
        label: 'hack',
        value: 234,
        color: 'hsl(230, 70%, 50%)',
    },
];

export function Basic() {
    return (
        <Container>
            <Component height={500} data={Nivo} />
        </Container>
    );
}
