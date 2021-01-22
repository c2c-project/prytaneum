import React from 'react';
import { makeQuestion } from 'prytaneum-typings';

import Component from '.';

export default { title: 'Domains/Questions/Question Card' };

export function Basic() {
    return <Component question={makeQuestion()} />;
}
