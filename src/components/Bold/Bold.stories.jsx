import React from 'react';
import { MemoryRouter } from 'react-router-dom'

import Bold from '.';

const toBoldString = "test_asdASD_123_=-0\"\'";
const toBoldJSX = <p>this should look bold</p>;
const toBoldJSXArr = 
    <div>
        <p>test_jsxArr</p>
        <p>testingJSX[]</p>
    </div>;

export function BoldText() {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Bold 
                children={toBoldString}
            />
            <Bold 
                children={toBoldJSX}
            />
            <Bold 
                children={toBoldJSXArr}
            />
            <p>this is not bold for reference</p>
        </MemoryRouter>
    );
}