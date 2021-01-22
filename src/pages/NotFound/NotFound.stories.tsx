import React from 'react';
import { Meta } from '@storybook/react';
import Component from './NotFound';

export default {
    title: 'Pages/Not Found',
    component: Component,
    parameters: {
        layout: 'centered',
    },
} as Meta;

interface Props {
    errorMessage: string;
}

export const NotFound = ({ errorMessage }: Props) => <Component errorMessage={errorMessage} />;

NotFound.args = {
    errorMessage: 'Invalid Link',
};
