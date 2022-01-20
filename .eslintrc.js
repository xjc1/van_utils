module.exports = {
  root: true,
  env: {
    node: false,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': ['error', 'always', { js: 'never', vue: 'off' }],
    'linebreak-style': ['off', 'windows'],
    'no-underscore-dangle': 'off',
  },
};
