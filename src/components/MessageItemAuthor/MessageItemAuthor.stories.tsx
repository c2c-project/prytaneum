import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Component from './MessageItemAuthor';
import theme from 'theme';

export default { 
    title: 'Components/MessageItemAuthor',
    component: Component 
};

const onClick = () => {
    alert("onClick works");
};

const str1 = "";
const str2 = "1_2";
const str3 = "fname lname";
const str4 = "lname";
const nonBold = "this is not bold for reference.";

export function MessageItemAuthorDisplay() {
    return (
        <ThemeProvider theme={theme}>
            <Component name={str1} />
            <Component name={str2} />
            <Component name={str3} />
            <Component name={str4} />
            <p>{nonBold}</p>
        </ThemeProvider>
    );
}
