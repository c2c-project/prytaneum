const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-essentials',
            options: {
                docs: false,
            },
        },
    ],
    typescript: {
        reactDocgen: 'none',
    },
    'hooks/useSocketio': path.resolve(
        __dirname,
        '../src/hooks/__mocks__/useSocketio'
    ),
};
