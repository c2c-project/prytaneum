module.exports = {
    // parser: 'babel-eslint',
    // plugins: ['import', 'jsx-a11y', 'meteor'],
    //meteorjs/eslint-config-meteor uses airbnb
    extends: ['airbnb', 'prettier'],
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/no-array-index-key': 0,
        'react/forbid-prop-types': 0,
        'react/no-find-dom-node': 0,
        'jsx-quotes': ['error', 'prefer-single'],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.tests.js', '**/*.stories.*'] }
        ],
        'import/no-absolute-path': 0,
        'no-underscore-dangle': 'off',
        'func-names': 'off'
    },
    env: {
        node: true,
        browser: true,
        mocha: true
    },
    settings: {
        'import/extensions': ['.js', '.jsx'],
        // 'import/ignore': ['\.png$'],
        // 'import/no-unresolved': [2, { ignore: ['\.png$'] }]
        // 'import/resolver': {
        //     node: {
        //         paths: ['.']
        //     }
        //     // alias: {
        //     //     map: [['/src', './src']],
        //     //     extensions: ['.ts', '.js', '.jsx', '.json']
        //     // }
        // }
    }
};
