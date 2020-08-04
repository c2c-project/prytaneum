import React from 'react';

import MessageItemText from '.';

export default { title: 'Components/MessageItemText' };

const onClick = () => {
    alert("onClick works");
};

const str1 = "";
const str2 = "1_2";
const str3 = "some t3xT";
const str4 = "_+=1-2301=2-30=01KOMfkldmsrkwepro,apds,fOP<AOF<S/.':L<:";
const nonBold = "this is to check if it displayed properly.";

export function MessageItemTextDisplay() {
    return (
        <div>
            <MessageItemText text={str1} />
            <MessageItemText text={str2} />
            <MessageItemText text={str3} />
            <MessageItemText text={str4} />
            <p>{nonBold}</p>
        </div>
    );
}