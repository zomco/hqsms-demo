module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/vue3-essential'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-tabs': 'off',
    'no-unused-vars': 'off',
    'no-irregular-whitespace': 'off'
  },

  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ]
}
