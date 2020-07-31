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
            sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
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
            // base: ['4vw', 1.222222222],
            // md: ['1.8125rem', 1.103448276],
            'large-sm': ['8vw', 1.111111111],
            // 'large-md': ['3.84rem', 1],
            'large-md': ['3.75rem', 1],
        },
        letterSpacing: {
            tight: '-.02em',
            normal: 0,
            wide: '0.01em',
        },
        extend: {
            padding: {
                '1/3': '0.333333em', // For blocks
            },
            margin: {
                '1/2': '0.5em',
                // '2/9': '0.222222em',
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
    variants: {},
    plugins: [
        require('tailwindcss-gradients'),
    ],
    corePlugins: {
        container: false,
    },
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'nuxt.config.js',
        ],
    },
};
