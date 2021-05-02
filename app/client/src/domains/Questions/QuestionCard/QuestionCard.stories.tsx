import * as React from 'react';
import { Meta } from '@storybook/react';
import { makeQuestion } from 'prytaneum-typings';

import Component from '.';

export default { title: '@local/domains/Questions/Question Card', parameters: { layout: 'centered' } } as Meta;

export const QuestionCard = () => <Component question={makeQuestion()} />;
