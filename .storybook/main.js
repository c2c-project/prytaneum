const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.jsx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-a11y/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-viewport/register',
    ],
    webpackFinal: (config) => {
        config.resolve.alias = {
            'hooks/useEndpoint': path.resolve(
                __dirname,
                '../src/hooks/__mocks__/useEndpoint'
            ),
            'hooks/useSocketio': path.resolve(
                __dirname,
                '../src/hooks/__mocks__/useSocketio'
            ),
        };
        return config;
    },
};
