import React from 'react';

import Component from './TitleCard';

export default { title: 'components/Title Card' };

export function Basic() {
    return (
        <div
            style={{
                maxWidth: '1000px',
                maxHeight: '240px',
                width: '100%',
                height: '100%',
            }}
        >
            <Component
                title='Townhalls'
                stats={[
                    ['Past', 10],
                    ['Upcoming', 3],
                    ['Total', 13],
                ]}
            />
        </div>
    );
}
