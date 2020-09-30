import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import Component from './Fab';

export default {
    title: 'Components/Fab',
    component: Component,
};

const onClick = () => {
    // eslint-disable-next-line no-alert
    alert('onClick works');
};

export function FabButton() {
    return (
        <Component onClick={onClick}>
            <AddIcon />
        </Component>
    );
}
