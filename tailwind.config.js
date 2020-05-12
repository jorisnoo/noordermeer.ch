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
        extend: {},
    },
    variants: {},
    plugins: [],
};
