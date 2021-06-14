const plugins = [
    [
        'babel-plugin-import',
        {
            libraryName: '@material-ui/core',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'core',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@material-ui/icons',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'icons',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@material-ui/lab',
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
