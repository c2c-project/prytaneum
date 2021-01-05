import React from 'react';

import Component from './Select';

export default { title: 'Components/Select' };

export function Basic() {
    const [state, setState] = React.useState('1');

    return (
        <div style={{ width: '50%', paddingTop: '100px', paddingLeft: '30px' }}>
            <Component
                value={state}
                onChange={(e) => {
                    const { value } = e.target;
                    setState(value);
                }}
                options={['1', '2', '3']}
                getSecondary={() => {}}
            />
        </div>
    );
}
