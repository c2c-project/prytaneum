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
        'storybook-addon-performance/register',
    ],
    typescript: {
        reactDocgen: 'none',
    },
    webpackFinal: (config) => {
        config.resolve.alias = {
            'hooks/useSocketio': path.resolve(
                __dirname,
                '../src/hooks/__mocks__/useSocketio'
            ),
        };
        return config;
    },
};
