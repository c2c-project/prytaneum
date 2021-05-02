module.exports = {
    plugins: ['jest', '@typescript-eslint'],
    extends: [
        'react-app',
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
                    '**/__mocks__/*',
                    '**/mock/**',
                    '**/*.mock.ts',
                    '**/*.tests.js',
                    '**/*.test.ts',
                    '**/*.test.tsx',
                    '**/*.stories.*',
                    '**/__tests__/**',
                    '**/setupTests.ts',
                ],
            },
        ],
        'import/no-absolute-path': 0,
        'no-underscore-dangle': 'off',
        'func-names': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts?(x)', '**/*.js?(x)'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
    env: {
        node: true,
        browser: true,
        'jest/globals': true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
};
