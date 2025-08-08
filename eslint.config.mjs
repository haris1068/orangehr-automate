import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

export default [
    {
        ignores: ['node_modules/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            playwright,
        },
        rules: {
            'no-unused-vars': 'error',
            'no-console': 'error',
            'curly': ['error', 'all'],
            'no-implicit-coercion': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'no-empty-function': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/strict-boolean-expressions': 'error',
            'playwright/no-skipped-test': 'error',
            'playwright/no-focused-test': 'error',
            'playwright/prefer-to-have-length': 'error',
            'quotes': ['error', 'single', { avoidEscape: true }],
            'semi': ['error', 'always'], // change to 'never' if you want no semicolons
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'indent': ['error', 2, { SwitchCase: 1 }],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            'comma-spacing': ['error', { before: false, after: true }],
            'space-before-blocks': ['error', 'always'],
            'keyword-spacing': ['error', { before: true, after: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
        },
    },
    {
        files: ['tests/**/*.ts'],

    },
];
