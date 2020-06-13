module.exports = {
    // parser: 'babel-eslint',
    plugins: ['jest', '@typescript-eslint'],
    //meteorjs/eslint-config-meteor uses airbnb
    extends: [
        'airbnb-typescript',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        quotes: ['error', 'single'],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/no-array-index-key': 0,
        'react/forbid-prop-types': 0,
        'react/no-find-dom-node': 0,
        'react/jsx-curly-newline': ['off'],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-wrap-multilines': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.tests.js',
                    '**/*.test.js',
                    '**/*.stories.*',
                    '**/__tests__/**',
                    '**/setupTests.js',
                ],
            },
        ],
        'import/no-absolute-path': 0,
        'no-underscore-dangle': 'off',
        'func-names': 'off',
        '@typescript-eslint/naming-convention': 'off',
    },
    env: {
        node: true,
        browser: true,
        mocha: true,
        'jest/globals': true,
    },
    settings: {
        // 'import/extensions': ['.js', '.jsx'],
        // 'import/ignore': ['\.png$'],
        // 'import/no-unresolved': [2, { ignore: ['\.png$'] }]
        'import/resolver': {
            node: {
                paths: ['src'],
            },
            // alias: {
            //     // map: [['/src', './src']],
            //     extensions: ['.ts', '.js', '.jsx', '.json']
            // }
        },
    },
};
