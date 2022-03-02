import * as React from 'react';
import { Meta } from '@storybook/react';
import AddIcon from '@mui/icons-material/Add';

import { Fab as Component } from './Fab';

export default {
    title: '@local/components/Fab',
    component: Component,
    argTypes: {
        onClick: { onClick: 'fab clicked' },
    },
} as Meta;

interface Props {
    onClick: () => void;
}

export function FabButton({ onClick }: Props) {
    return (
        <Component onClick={onClick}>
            <AddIcon />
        </Component>
    );
}
