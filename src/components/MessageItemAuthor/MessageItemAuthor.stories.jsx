import React from 'react';

import MessageItemAuthor from '.';

export default { title: 'Components/MessageItemAuthor' };

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
        <div>
            <MessageItemAuthor name={str1} />
            <MessageItemAuthor name={str2} />
            <MessageItemAuthor name={str3} />
            <MessageItemAuthor name={str4} />
            <p>{nonBold}</p>
        </div>
    );
}