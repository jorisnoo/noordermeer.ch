module.exports = {
    title: 'Joris Noordermeer — Web Development',
    description: 'Joris Noordermeer specializes in website and application development.',
    dest: 'public',
    head: [
        ['link', {rel: 'apple-touch-icon', sizes: "180x180", href: '/meta/apple-touch-icon.png'}],
        ['link', {rel: 'icon', type: "image/png", sizes: "32x32", href: '/meta/favicon-32x32.png'}],
        ['link', {rel: 'icon', type: "image/png", sizes: "16x16", href: '/meta/favicon-16x16.png'}],
        ['link', {rel: 'manifest', href: '/meta/site.webmanifest'}],
        ['link', {rel: 'mask-icon', href: '/meta/safari-pinned-tab.svg', color: '#f9325a'}],
        ['link', {rel: 'msapplication-TileColor', content: '#e6e6e6'}],
        ['link', {rel: 'theme-color', content: '#e6e6e6'}],
    ],
    markdown: {
        anchor: {permalink: false},
    },
    postcss: {
        plugins: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
        ],
    },
    plugins: {
        // Using the official Vuepress blog plugin for the blog section
        // See https://vuepress-plugin-blog.ulivz.com/ for documentation
        // '@vuepress/blog': {
        //     directories: [
        //         {
        //             id: 'post',
        //             dirname: 'blog',
        //             path: '/blog',
        //             layout: 'BlogIndex',
        //             itemLayout: 'BlogPost',
        //         },
        //     ],
        // },
        // Set meta tags automatically
        // See https://github.com/webmasterish/vuepress-plugin-autometa#options for documentation
        'autometa': {
            canonical_base: 'https://noordermeer.ch',
            site: {
                name: 'Joris Noordermeer — Web Development',
            },
        },
        // Generate a sitemap
        // See https://github.com/ekoeryanto/vuepress-plugin-sitemap#options for documentation
        'sitemap': {
            hostname: 'https://noordermeer.ch',
            changefreq: 'weekly',
            exclude: [
                '/404.html',
            ],
        },
    },
};
