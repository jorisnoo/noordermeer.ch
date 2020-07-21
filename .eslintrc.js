module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
    ],
    plugins: [
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
        indent: ['warn', 4, { SwitchCase: 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/script-indent': ['warn', 4, { baseIndent: 0, switchCase: 1 }],
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': ['error', { singleline: 2 }],
        'vue/match-component-file-name': ['error', {
            extensions: ['vue'],
        }],
    },
};
