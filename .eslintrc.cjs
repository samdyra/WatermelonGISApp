// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      files: ['*.ts', '*.tsx'],
      parserOptions: { project: path.join(__dirname, 'tsconfig.json') },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: path.join(__dirname, 'tsconfig.json') },
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-case-declarations': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-underscore-dangle': 'warn',
    'react-native/no-raw-text': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': 'off',
    'no-multi-spaces': 'warn',
    'spaced-comment': 'off',
    eqeqeq: 'off',
    radix: 'warn',
    indent: [1, 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['warn', 'always'],
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'warn',
    'no-plusplus': 'warn',
    'no-param-reassign': 'warn',
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
      },
    ],
    'no-empty': 'off',
    'vars-on-top': 'warn',
    'no-restricted-properties': 'warn',
    'no-useless-escape': 'warn',
    'no-return-await': 'warn',
    'no-unneeded-ternary': 'warn',
    'class-methods-use-this': 'warn',
    'no-lone-blocks': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};

module.exports = config;
