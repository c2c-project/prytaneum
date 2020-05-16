/* eslint-disable */
import React from 'react';
import {QuestionWindow} from './ChatWindow';
 
export default { title: 'chatchat' };

export function MessageWindow() {
    return (
        <div style={{ height: '500px' }}>
            <QuestionWindow roomId='5e14fa399474eb8b14b5b152' title="title"/>
        </div>
    );
}
