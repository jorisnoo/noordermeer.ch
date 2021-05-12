/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        fontFamily: {
            sans: [
                '"DM Sans"',
                '"Noto Sans JP"',
                ...defaultTheme.fontFamily.sans,
            ],
            mono: ['"DM Mono"', ...defaultTheme.fontFamily.mono],
        },
        colors: {
            transparent: 'transparent',
            black: '#000000',
            white: '#e6e6e6',
            red: '#f9325a',
            green: '#149646',
            blue: '#1e50f0',
        },
        linearGradientColors: {
            'fade-out': ['rgba(230,230,230,0.001)', '#e6e6e6 20%'],
            'fade-out-dark': ['rgba(0,0,0,0.001)', '#000000 20%'],
        },
        fontSize: {
            base: ['5vw', { lineHeight: 1.25 }],
            'base-sm': ['4vw', { lineHeight: 1.25 }],
            'base-md': ['1.8125rem', { lineHeight: 1.2 }],

            large: ['6.8vw', { lineHeight: 1.25 }],
            'large-sm': ['6vw', { lineHeight: 1.25 }],
            'large-md': ['3rem', { lineHeight: 1.1 }],

            blocks: ['4.375rem', 1.1111111],
        },
        extend: {
            screens: {
                navigation: '1200px',
            },
            padding: {
                '1/3': '0.333333em', // For blocks
            },
            margin: {
                '1/3': '0.333333em',
                '1/2': '0.5em',
            },
            borderWidth: {
                3: '3px',
            },
            lineHeight: {
                'link-sm': 0.85,
                'link-md': 0.8,
            },
        },
    },
    plugins: [
        require('tailwindcss-gradients'),
    ],
};
