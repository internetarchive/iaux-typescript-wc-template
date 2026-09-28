import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import esX from 'eslint-plugin-es-x';
import html from 'eslint-plugin-html';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: { 'es-x': esX, html },
    rules: {
      // Regex syntax newer than the browser floor is a parse error, not a
      // degraded feature: the engine rejects the whole module, so every page
      // importing the component renders blank. The floor is Safari 16.4, so
      // these three stay banned even though `tsc` accepts them all.
      'es-x/no-regexp-lookbehind-assertions': 'error',
      'es-x/no-regexp-v-flag': 'error',
      'es-x/no-regexp-modifiers': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['**/*.js', '**/*.mjs', '**/*.d.ts'],
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
);
