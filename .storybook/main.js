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
            'hooks/useSocketio': path.resolve(__dirname, '../src/hooks/__mocks__/useSocketio'),
        };
        return config;
    },
    babel: async (options) => {
        return {
            ...options,
            plugins: [
                ...options.plugins,
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/core',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'core',
                ],
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/icons',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'icons',
                ],
                [
                    'babel-plugin-import',
                    {
                        libraryName: '@material-ui/lab',
                        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                        libraryDirectory: 'esm',
                        camel2DashComponentName: false,
                    },
                    'lab',
                ],
            ],
        };
    },
};
