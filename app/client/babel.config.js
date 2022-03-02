const plugins = [
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/material',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'core',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/icons-material',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'icons',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/lab',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'lab',
    ],
    ['relay', { artifactDirectory: './src/__generated__' }],
];

const presets = ['next/babel'];

module.exports = { plugins, presets };
