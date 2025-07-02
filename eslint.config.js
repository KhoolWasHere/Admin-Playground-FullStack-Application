/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off'
    }
  }
];
