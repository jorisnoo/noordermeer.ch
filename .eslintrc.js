module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    plugins: [
        'vue',
    ],
    rules: {
        'semi': ['error', 'always'],
        'indent': ['error', 4, {"SwitchCase": 1}],
        'no-console': 'warn',
        "comma-dangle": ["error", "always-multiline"],
        "vue/comma-dangle": ["error", "always-multiline"],
        'vue/script-indent': ['error', 4, {'baseIndent': 1, "switchCase": 1}],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ["error", {"singleline": 2}],
        "vue/match-component-file-name": ["error", {
            "extensions": ["vue"],
        }],
    },
    overrides: [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
            },
        },
    ],
    "globals": {
        "Vue": "readonly",
    },
};
