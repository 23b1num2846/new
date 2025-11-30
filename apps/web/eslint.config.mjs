import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { plugins: { '@next/next': nextEslintPluginNext } },
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
];
