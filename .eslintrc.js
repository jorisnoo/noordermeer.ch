module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2019,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    rules: {
        'semi': ['error', 'always'],
        'indent': ['error', 4, {SwitchCase: 1}],
        'no-console': 'warn',
        'comma-dangle': ['error','always-multiline',],
        'vue/comma-dangle': ['error','always-multiline',],
        'vue/script-indent': ['error',4, {baseIndent: 1, switchCase: 1}],
        'vue/html-indent': ['error',4,],
        'vue/max-attributes-per-line': ['error', {singleline: 2}],
        'vue/match-component-file-name': ['error', {extensions: ['vue']}],
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {indent: 'off'},
        },
    ],
};
