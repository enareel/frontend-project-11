import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'node_modules',
      '**/package-lock.json',
      'build',
      '**/coverage/',
      '**/__tests__/',
      '**/__fixtures__/',
      '**/logs',
      '**/*.log',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/report.*',
      '**/.idea',
      '**/.vscode/',
      '**/.DS_Store',
      '**/Thumbs.db',
      '**/__MACOSX',
      '**/.env.local',
      '**/.env.development.local',
      '**/.env.test.local',
      '**/.env.production.local',
    ],
  },
  ...compat.extends('eslint:recommended', 'airbnb-base', 'prettier'),
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'arrow-body-style': [0, 'as-needed'],
      'comma-dangle': [2, 'always-multiline'],
      'operator-linebreak': [2, 'before'],
      'no-console': 0,

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],

      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

      'no-underscore-dangle': [
        2,
        {
          allow: ['__filename', '__dirname'],
        },
      ],

      'consistent-return': [
        0,
        {
          treatUndefinedAsUnspecified: true,
        },
      ],
    },
  },
];
