module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {},
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'max-len': ['error', { ignoreUrls: true, code: 120 }],
    'func-names': 'off',
    'default-case': 'off',
    'global-require': 0,
    'import/first': 0,
    'no-param-reassign': 0,
    'no-multi-assign': 0,
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': 'off',
    'no-mixed-operators': 'off',
    'function-paren-newline': 'off',
    indent: 'off',
    'arrow-body-style': 'off',
    'no-new': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    semi: [2, 'always'],
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }]
  }
};
