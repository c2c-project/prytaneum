const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.(jsx|tsx|mdx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
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
