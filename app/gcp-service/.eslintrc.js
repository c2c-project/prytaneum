module.exports = {
    plugins: ['@typescript-eslint', 'import'],
    extends: ['airbnb-typescript/base', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        quotes: ['error', 'single'],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/__mocks__/*',
                    '**/mock/**',
                    '**/*.mock.ts',
                    '**/*.tests.js',
                    '**/*.test.ts',
                    '**/*.spec.ts',
                    '**/*.stories.*',
                    '**/__tests__/**',
                    '**/setupTests.ts',
                    '**/scripts/**',
                    '**/mocks/**',
                ],
            },
        ],
        'import/no-absolute-path': 0,
        'no-underscore-dangle': 'off',
        'func-names': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'import/prefer-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
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
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
};
