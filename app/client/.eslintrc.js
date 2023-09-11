module.exports = {
    plugins: ['jest', '@typescript-eslint'],
    extends: ['next/core-web-vitals', 'airbnb-typescript', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        quotes: ['error', 'single'],
        indent: 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
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
                    '**/scripts/**',
                    '**/*.spec.ts',
                    '**/*.spec.tsx',
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
        'import/no-anonymous-default-export': 'off',
        'react/display-name': [0, { ignoreTranspilerName: true }],
        '@next/next/no-img-element': 'off',
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
