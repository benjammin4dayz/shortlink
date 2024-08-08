import globals from 'globals';
import js from '@eslint/js';
import node from 'eslint-plugin-n';

export default [
  js.configs.recommended,
  node.configs['flat/recommended-module'],
  {
    files: ['**/*.js'],

    plugins: {
      node: node,
    },

    rules: {
      'node/exports-style': ['error', 'module.exports'],
      'node/file-extension-in-import': ['error', 'never'],
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/console': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
      'node/prefer-global/url-search-params': ['error', 'always'],
      'node/prefer-global/url': ['error', 'always'],
      'node/prefer-promises/dns': 'error',
      'node/prefer-promises/fs': 'error',
      'node/no-unsupported-features/es-syntax': 'off',
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: 2024,
      sourceType: 'module',
    },
  },
];
