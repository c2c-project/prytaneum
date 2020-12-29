import React from 'react';

import Container from '.';
import AppBar from '../AppBar';
import StyleContainer from '../Page';

export default { title: 'Layout/Page' };

export function Basic() {
    return (
        <StyleContainer>
            <AppBar>Appbar</AppBar>
            <Container>
                <div
                    style={{
                        backgroundColor: 'black',
                        border: '10px solid blue',
                        color: 'white',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    content
                </div>
            </Container>
        </StyleContainer>
    );
}
