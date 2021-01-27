import React from 'react';
import { Meta, Story } from '@storybook/react';
import { makeQuestion } from 'prytaneum-typings';

import { QuestionCarousel as Component, CarouselProps } from './QuestionCarousel';

export default { title: 'Domains/Questions/Question Carousel' } as Meta;

export const QuestionCarousel: Story<CarouselProps> = (props) => (
    <div style={{ flex: 1, height: '100%', width: '100%', padding: 60 }}>
        <Component {...props} />
    </div>
);

QuestionCarousel.args = {
    question: makeQuestion(),
    hasNext: false,
    hasPrev: false,
};

QuestionCarousel.argTypes = {
    onClickNext: { action: 'next' },
    onClickPrev: { action: 'prev' },
};
