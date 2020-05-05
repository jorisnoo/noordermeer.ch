module.exports = {
    title: 'Vuepress Website Starter',
    description: 'Build a website with Vuepress and Tailwind with ease',
    dest: 'public',
    head: [
        // ['link', {rel: 'apple-touch-icon', sizes: "180x180", href: '/meta/apple-touch-icon.png'}],
        // ['link', {rel: 'icon', type: "image/png", sizes: "32x32", href: '/meta/favicon-32x32.png'}],
        // ['link', {rel: 'icon', type: "image/png", sizes: "16x16", href: '/meta/favicon-16x16.png'}],
        // ['link', {rel: 'manifest', href: '/meta/site.webmanifest'}],
        // ['link', {rel: 'mask-icon', href: '/meta/safari-pinned-tab.svg', color: '#ffffff'}],
        // ['link', {rel: 'msapplication-TileColor', content: '#ffffff'}],
        // ['link', {rel: 'theme-color', content: '#ffffff'}],
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
        '@vuepress/blog': {
            directories: [
                {
                    id: 'post',
                    dirname: 'blog',
                    path: '/blog',
                    layout: 'BlogIndex',
                    itemLayout: 'BlogPost',
                },
            ],
        },
        // Set meta tags automatically
        // See https://github.com/webmasterish/vuepress-plugin-autometa#options for documentation
        'autometa': {
            canonical_base: 'https://vuepress-wbite-starter.netlify.app',
            site: {
                name: 'Vuepress Website Starter',
            },
        },
        // Generate a sitemap
        // See https://github.com/ekoeryanto/vuepress-plugin-sitemap#options for documentation
        'sitemap': {
            hostname: 'https://vuepress-wbite-starter.netlify.app',
            changefreq: 'weekly',
            exclude: [
                '/404.html',
            ],
        },
    },
};
