module.exports = {
    root: true,
    env: {
      node: true,
      'vue/setup-compiler-macros': true
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  }