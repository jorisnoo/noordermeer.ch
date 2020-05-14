const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './src/.vuepress/theme/**/*.vue',
    ],
    theme: {
        fontFamily: {
            'sans': ['"DM Sans"', ...defaultTheme.fontFamily.sans],
            // 'serif': [...defaultTheme.fontFamily.serif],
        },
        colors: {
            black: '#000000',
            white: '#e6e6e6',
            red: '#f9325a',
            green: '#149646',
            blue: '#1e50f0',
        },
        fontSize: {
            base: ['8vw', 1.111111111],
            md: ['3.84rem', 1.111111111],
            lg: ['4.375rem', 1.111111111],
        },
        extend: {
            padding: {
                '1/3': '0.333333em',
            },
            margin: {
                '2/9': '0.222222em',
            },
        },
    },
    variants: {},
    plugins: [],
};
