module.exports = {
    stories: ['../src/**/*.stories.@(jsx|mdx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-a11y/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-docs'
    ],
};
