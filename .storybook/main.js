const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(jsx|tsx|mdx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
    ],
    webpackFinal: (config) => {
        config.resolve.alias = {
            'hooks/socketIo': path.resolve(
                __dirname,
                '../src/hooks/__mocks__/socketIo'
            ),
        };
        return config;
    },
};
