module.exports = {
    plugins: ['jest', '@typescript-eslint'],
    extends: [
        'react-app',
        'airbnb-typescript',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // 'plugin:jest/recommended',
    ],
    parserOptions: {
        project: './tsconfig.base.json',
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
        'react/react-in-jsx-scope': 'off', // react 17 makes it unnecessary
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
        'import/prefer-default-export': 'off',
        // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/
        'react/require-default-props': 'off',
    },
    overrides: [
        {
            files: ['./app/**/*.ts?(x)', './app/**/*.js?(x)'],
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
